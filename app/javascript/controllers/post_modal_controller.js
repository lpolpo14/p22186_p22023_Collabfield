// app/javascript/controllers/post_modal_controller.js
import { Controller } from "@hotwired/stimulus"
  

export default class extends Controller {
  static targets = ["modal", "postedBy", "title", "content", "interestLink"]

  connect() {
    this.modalInstance = new bootstrap.Modal(this.modalTarget)

    document.addEventListener("turbo:before-cache", () => {
      this.modalInstance.hide()
    })
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
}

