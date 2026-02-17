// app/javascript/controllers/polling_frame_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { interval: { type: Number, default: 3000 } }

  connect() {
    this.paused = false

    this.bindDropdownListeners()
    this.start()
  }

  disconnect() {
    this.stop()
    this.unbindDropdownListeners()
  }

  start() {
    this.stop()
    this.timer = setInterval(() => {
      if (this.paused) return

      // Extra safety: if dropdown is open, don't reload
      if (this.dropdownIsOpen()) return

      this.element.reload()
    }, this.intervalValue)
  }

  stop() {
    if (this.timer) clearInterval(this.timer)
    this.timer = null
  }

  bindDropdownListeners() {
    // The frame content gets replaced, so query inside the frame element
    this.dropdownToggle = this.element.querySelector('[data-bs-toggle="dropdown"]')
    if (!this.dropdownToggle) return

    this.onShown = () => { this.paused = true }
    this.onHidden = () => { this.paused = false }

    this.dropdownToggle.addEventListener("shown.bs.dropdown", this.onShown)
    this.dropdownToggle.addEventListener("hidden.bs.dropdown", this.onHidden)
  }

  unbindDropdownListeners() {
    if (!this.dropdownToggle) return
    this.dropdownToggle.removeEventListener("shown.bs.dropdown", this.onShown)
    this.dropdownToggle.removeEventListener("hidden.bs.dropdown", this.onHidden)
  }

  dropdownIsOpen() {
    // Bootstrap sets aria-expanded="true" when open
    return this.element.querySelector('[data-bs-toggle="dropdown"][aria-expanded="true"]') !== null
  }
}

