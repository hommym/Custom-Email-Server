class EmailQueue {
  dataStorage = [];

  enqueue(data) {
    this.dataStorage.push(data);
  }

  dequeue() {
    if (this.dataStorage.length != 0) {
      const dequeuedData = this.dataStorage.splice(0, 1);
      return dequeuedData[0];
    }

    return null;
  }

  peek() {
    if (this.dataStorage.length != 0) {
      return this.dataStorage[0];
    }

    return null;
  }
}

module.exports = EmailQueue;
