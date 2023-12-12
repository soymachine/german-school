class EventSystem {
    constructor() {
      // Initialize an empty map to store event subscriptions
      this.subscribers = new Map();
    }
  
    // Subscribe a callback function to an event
    subscribe(event, callback) {
      if (!this.subscribers.has(event)) {
        this.subscribers.set(event, []);
      }
      this.subscribers.get(event).push(callback);
    }
  
    // Publish a message to all subscribers of an event
    publish(event, message) {
      if (this.subscribers.has(event)) {
        const subscribers = this.subscribers.get(event);
        subscribers.forEach(callback => callback(message));
      }
    }
  
    // Example usage:
    // eventSystem.subscribe('userLoggedIn', (user) => {
    //   console.log(`User ${user} logged in.`);
    // });
    // eventSystem.publish('userLoggedIn', 'Alice');
  }
  
class Events {
}

Events.ON_PROGRESS_LOADING = "ON_PROGRESS_LOADING"
Events.ON_LOADING_COMPLETED = "ON_LOADING_COMPLETED"
Events.ON_DATA_UPDATED = "ON_DATA_UPDATED"
Events.ON_CONTENT_BEGIN_SHOWN = "ON_CONTENT_BEGIN_SHOWN"
Events.ON_CONTENT_SHOWN = "ON_CONTENT_SHOWN"
Events.ON_CONTENT_HIDE = "ON_CONTENT_HIDE"
Events.ON_QUESTIONAIRE_UPDATE = "ON_QUESTIONAIRE_UPDATE"
Events.ON_RESPONSE_UPDATE = "ON_RESPONSE_UPDATE"
Events.ON_REQUEST_STEP = "ON_REQUEST_STEP"
Events.ON_REQUEST_NEXT_STEP = "ON_REQUEST_NEXT_STEP"

const eventSystem = new EventSystem();
  
// Export the singleton instance
export {eventSystem, Events};