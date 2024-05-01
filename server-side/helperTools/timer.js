const wait = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Waiting time is up");
      resolve();
    }, time);
  });
};

module.exports = wait;
