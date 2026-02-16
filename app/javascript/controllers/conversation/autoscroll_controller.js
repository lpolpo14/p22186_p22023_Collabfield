import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.scrollToBottom()
  }
  
  scrollToBottomIfNearBottom(){
    const threshold = 80;
    const {scrollTop, scrollHeight , clientHeight} = this.element;
    var result = scrollHeight - scrollTop; // Top of the visible area to the very bottom
    result = result - clientHeight // removes the visible portion
    if (result < threshold){
      this.scrollToBottom();
    }
    console.log("Scroll result:", result, "Threshold:", threshold);
  }

  scrollToBottom() {
      this.element.scrollTo({
      top: this.element.scrollHeight,
      behavior: 'smooth'
  });
  }
}
