// app/javascript/controllers/conversation_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["window"]

  connect() {
    this.positionAll()
    
    // Listen for Turbo Stream updates to reposition
    document.addEventListener("turbo:before-stream-render", () => {
      // Small delay to ensure DOM is updated
      setTimeout(() => this.positionAll(), 50)
    })
  }

  positionAll() {
    const windows = document.querySelectorAll(".conversation-window")
    
    windows.forEach((window, index) => {
      // Calculate position from right
      const rightPosition = index * 410 // 400px width + 10px gap
      window.style.right = `${rightPosition}px`
      window.style.zIndex = 1000 + index // Higher index = appears on top
    })
  }
}
