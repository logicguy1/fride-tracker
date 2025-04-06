
export const make_zero = (inp) => {
  if (inp < 10){
    return "0"+inp;
  } else {
    return inp.toString()
  }
}

export const split_time = (time) => {
  var hour = parseInt(time.split(":")[0]);
  var min = parseInt(time.split(":")[1].split(" ")[0]);
  var day = parseInt(time.split(" ")[1]);

  return [hour, min, day];
}

// Same as above but aliased
export const unformat_time = (time) => {return split_time(time)} 

export const format_time = (hour, min, day) => {
  return `${make_zero(hour)}:${make_zero(min)} ${make_zero(day)}`
}

export const convert_timestamp = (time) => {
  //                             DD HH MM 
  //var time = new Date("2000-01-01T00:00:00Z");
  
  var hour = parseInt(time.split(":")[0]);
  var min = parseInt(time.split(":")[1].split(" ")[0]);
  var day = parseInt(time.split(" ")[1]);

  var stamp = + new Date(`2000-01-${make_zero(day)}T${make_zero(hour)}:${make_zero(min)}:00`);
  return stamp;
}

export const timestamp_convert = (timestamp) => {
  //var time = new Date("2000-01-01T00:00:00Z");
  var time = "" + new Date(timestamp);

  var day = parseInt(time.split(" ")[2])
  var hour = parseInt(time.split(" ")[4].split(":")[0])
  var min = parseInt(time.split(" ")[4].split(":")[1])

  return format_time(hour, min, day);
}

export const get_time_length = (start, stop) => {
  var startStamp = convert_timestamp(start);
  var stopStamp = convert_timestamp(stop);

  return parseInt(Math.round((stopStamp - startStamp) / 900000));
}

export const check_time_in = (start, stop, time) => {
  var startStamp = convert_timestamp(start);
  var stopStamp = convert_timestamp(stop);
  var timestamp = convert_timestamp(time);

  // if its inside the start stop params
  if (startStamp <= timestamp && timestamp < stopStamp){
    return true;
  } else {
    return false;
  }
}

export const floatToTimestamp = (floatTime) => {
    // Separate the integer part and the decimal part
    let hours = Math.floor(floatTime);
    let minutes = Math.round((floatTime - hours) * 60);

    // Format the minutes to two digits
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    // Concatenate hours and minutes with ':'
    return hours + ':' + minutes;
}
