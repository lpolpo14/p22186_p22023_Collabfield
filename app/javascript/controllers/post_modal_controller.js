// app/javascript/controllers/post_modal_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["modal"]
  
  connect() {
    this.cleanupBound = this.cleanup.bind(this)
    this.isDisconnecting = false
    
    // Listen to turbo events
    document.addEventListener('turbo:before-cache', this.cleanupBound)
    document.addEventListener('turbo:before-render', this.cleanupBound)
    
    this.modalElement = document.querySelector('.myModal')
    if (this.modalElement) {
      // Check if there's already a modal instance and dispose it first
      const existingInstance = bootstrap.Modal.getInstance(this.modalElement)
      if (existingInstance) {
        try {
          existingInstance.dispose()
        } catch (e) {
          // Ignore disposal errors
        }
      }
      
      this.modalInstance = new bootstrap.Modal(this.modalElement, { 
        keyboard: true, 
        backdrop: true 
      })
      
      // Clean up when modal is hidden via Bootstrap's own events
      this.hiddenHandler = () => {
        if (!this.isDisconnecting) {
          this.forceCleanup()
        }
      }
      this.modalElement.addEventListener('hidden.bs.modal', this.hiddenHandler)
    }
    
    // Cache modal elements
    this.modalPostedBy = document.querySelector('.modal-header .posted-by')
    this.modalTitle = document.querySelector('.loaded-data h3')
    this.modalContent = document.querySelector('.loaded-data p')
    this.modalInterestLink = document.querySelector('.loaded-data .interested a')
  }
  
  forceCleanup() {
    // Force remove Bootstrap's lock classes/elements
    document.body.classList.remove("modal-open")
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
    
    // Remove all backdrops
    const backdrops = document.querySelectorAll('.modal-backdrop')
    backdrops.forEach(backdrop => backdrop.remove())
    
    // Remove modal-specific classes
    if (this.modalElement && document.contains(this.modalElement)) {
      this.modalElement.classList.remove('show')
      this.modalElement.style.display = 'none'
      this.modalElement.setAttribute('aria-hidden', 'true')
      this.modalElement.removeAttribute('aria-modal')
    }
  }
  
  cleanup() {
    // Check if modal element still exists in DOM
    if (!this.modalElement || !document.contains(this.modalElement)) {
      this.forceCleanup()
      return
    }
    
    // Only hide the modal if it's actually visible
    if (this.modalInstance && this.modalElement.classList.contains('show')) {
      try {
        this.modalInstance.hide()
      } catch (e) {
        // If hide fails, force cleanup
        this.forceCleanup()
      }
    } else {
      // Modal not showing, just force cleanup
      this.forceCleanup()
    }
  }

  open(event) {
    if (!this.modalElement || !document.contains(this.modalElement)) return
    
    // Prevent opening if clicking on a link inside the card
    if (event.target.tagName === 'A') return
    
    // Prevent opening if clicking anything inside the modal itself
    if (event.target.closest('.modal')) return
    
    // Find the card element that has the data attributes
    const card = event.target.closest('[data-post-modal-title]')
    if (!card) return
    
    // Clean up first to ensure no lingering state
    this.forceCleanup()
    
    try {
      this.modalInstance.show()
    } catch (e) {
      console.warn('Error showing modal:', e)
      return
    }
    
    const { 
      postModalPostedBy: postedBy, 
      postModalTitle: title, 
      postModalContent: content, 
      postModalId: postId 
    } = card.dataset
    
    if (this.modalPostedBy) this.modalPostedBy.textContent = `Posted by ${postedBy}`
    if (this.modalTitle) this.modalTitle.textContent = title
    if (this.modalContent) this.modalContent.textContent = content
    if (this.modalInterestLink) this.modalInterestLink.href = `/posts/${postId}`
  }
  
  close(event) {
    event.preventDefault()
    event.stopPropagation()
    
    if (this.modalInstance && this.modalElement && document.contains(this.modalElement)) {
      try {
        this.modalInstance.hide()
      } catch (e) {
        this.forceCleanup()
      }
    }
  }
  
  disconnect() {
    this.isDisconnecting = true
    
    document.removeEventListener('turbo:before-cache', this.cleanupBound)
    document.removeEventListener('turbo:before-render', this.cleanupBound)
    
    // Remove event listener
    if (this.modalElement && this.hiddenHandler) {
      this.modalElement.removeEventListener('hidden.bs.modal', this.hiddenHandler)
    }
    
    // Force cleanup first
    this.forceCleanup()
    
    // Then dispose
    if (this.modalElement && document.contains(this.modalElement)) {
      try {
        const instance = bootstrap.Modal.getInstance(this.modalElement)
        if (instance) {
          instance.dispose()
        }
      } catch (e) {
        // Ignore disposal errors during disconnect
      }
    }
    
    this.modalInstance = null
  }
}
