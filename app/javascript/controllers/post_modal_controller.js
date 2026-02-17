// app/javascript/controllers/post_modal_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["modal", "postedBy", "title", "content", "interestLink"]

  connect() {
    this.modalInstance = bootstrap.Modal.getOrCreateInstance(this.modalTarget)

    this.beforeCacheHandler = () => this.forceClose()
    this.beforeVisitHandler = () => this.forceClose()

    document.addEventListener("turbo:before-cache", this.beforeCacheHandler)
    document.addEventListener("turbo:before-visit", this.beforeVisitHandler)

    // Safety: if user uses browser back/forward cache in some browsers
    this.pageShowHandler = (e) => {
      if (e.persisted) this.forceClose()
    }
    window.addEventListener("pageshow", this.pageShowHandler)
  }

  disconnect() {
    document.removeEventListener("turbo:before-cache", this.beforeCacheHandler)
    document.removeEventListener("turbo:before-visit", this.beforeVisitHandler)
    window.removeEventListener("pageshow", this.pageShowHandler)

    // Optional: fully dispose Bootstrap modal instance
    try { this.modalInstance.dispose() } catch (e) {}
  }

  open(event) {
    const card = event.currentTarget
    const {
      postModalPostedBy: postedBy,
      postModalTitle: title,
      postModalContent: content,
      postModalId: postId
    } = card.dataset

    this.postedByTarget.textContent = `Posted by ${postedBy}`
    this.titleTarget.textContent = title
    this.contentTarget.textContent = content
    this.interestLinkTarget.href = `/posts/${postId}`

    this.modalInstance.show()
  }

  close() {
    this.forceClose()
  }

  forceClose() {
    // 1) Tell Bootstrap to hide (may be async/animated)
    try { this.modalInstance.hide() } catch (e) {}

    // 2) Hard reset DOM state (this is what prevents “freeze”)
    this.modalTarget.classList.remove("show")
    this.modalTarget.style.display = "none"
    this.modalTarget.setAttribute("aria-hidden", "true")

    // Remove any leftover backdrops
    document.querySelectorAll(".modal-backdrop").forEach(el => el.remove())

    // Unlock the body
    document.body.classList.remove("modal-open")
    document.body.style.removeProperty("padding-right")
    document.body.style.removeProperty("overflow")
  }
}

