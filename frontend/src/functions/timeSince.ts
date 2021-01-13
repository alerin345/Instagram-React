const timeSince = (date:string):string => {

  let seconds:number = Math.floor((new Date().getTime() - new Date(date).getTime() ) / 1000);

  let interval:number = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval).toString() + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval).toString() + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval).toString() + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval).toString() + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval).toString() + " minutes ago";
  }
  return Math.floor(seconds).toString() + " seconds ago";
}

export default timeSince;
