import { Controller } from "@hotwired/stimulus"

// data-controller="group-chat-toggle"
export default class extends Controller {
  static targets = ["menu"]

  toggle(event) {
    event.stopPropagation()
    this.menuTarget.classList.toggle("is-open")
  }

  close() {
    this.menuTarget.classList.remove("is-open")
  }

  clickOutside(event) {
    if (!this.element.contains(event.target)) {
      this.close()
    }
  }
}

