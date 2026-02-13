import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["card"]

  connect() {
    if (!this.hasCardTarget) return

    this.mode = Math.floor(Math.random() * 2)
    this.colorSet = this.randomColorSet()
    
    // Store original colors for each card
    this.originalColors = new Map()

    this.cardTargets.forEach(card => {
      // Get the inner card div, not the outer container
      const innerCard = card.querySelector('.post-card-inner')
      if (!innerCard) return

      const randomColor = this.randomColor()
      this.originalColors.set(card, randomColor)

      if (this.mode === 1) {
        // Solid color mode - apply to background
        innerCard.classList.add("solid-color-mode")
        innerCard.style.backgroundColor = randomColor
        innerCard.style.border = "none"
      } else {
        // Border mode - apply border to inner card
        innerCard.classList.add("border-color-mode")
        innerCard.style.border = `3px solid ${randomColor}`
        innerCard.style.backgroundColor = "white"
      }
    })
  }

  hover(event) {
    const card = event.currentTarget
    const innerCard = card.querySelector('.post-card-inner')
    if (!innerCard) return

    const originalColor = this.originalColors.get(card)
    
    if (this.mode === 1) {
      // Solid mode: change background on hover
      innerCard.style.backgroundColor = this.randomColor()
    } else {
      // Border mode: change border color on hover
      innerCard.style.borderColor = this.randomColor()
    }
  }

  leave(event) {
    const card = event.currentTarget
    const innerCard = card.querySelector('.post-card-inner')
    if (!innerCard) return

    const originalColor = this.originalColors.get(card)
    
    if (this.mode === 1) {
      // Solid mode: revert background
      innerCard.style.backgroundColor = originalColor
    } else {
      // Border mode: revert border
      innerCard.style.borderColor = originalColor
    }
  }

  randomColor() {
    const colors = this.randomColorSet()
    return colors[Math.floor(Math.random() * colors.length)]
  }

  randomColorSet() {
    return [
      '#45CCFF', '#49E83E', '#FFD432', '#E84B30', '#B243FF',
      '#FF6138', '#FFFF9D', '#BEEB9F', '#79BD8F',
      '#FCFFF5', '#D1DBBD', '#91AA9D', '#3E606F',
      '#004358', '#1F8A70', '#BEDB39', '#FFE11A',
      '#105B63', '#FFFAD5', '#FFD34E', '#DB9E36',
      '#04BFBF', '#CAFCD8', '#F7E967', '#A9CF54',
      '#405952', '#9C9B7A', '#FFD393', '#FF974F'
    ]
  }
}
