import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const currentUserId = document.body.dataset.currentUserId
    const senderId = this.element.dataset.userId

    if (!currentUserId || !senderId) return

    if (senderId === currentUserId) {
      this.element.classList.add("message-sent")
    } else {
      this.element.classList.add("message-received")
    }
  }
}

