/**
 * Helper file for everything related about date and time
 * @author: ooemperor
 */

/**
 * export the time in format hh:mm:ss
 */
export function currentTime(){
    return (hour()+ ":" + minute() + ":" + second());
}

export function hour(){
    return new Date().getHours();
}

export function minute(){
    return new Date().getMinutes();
}

export function second(){
    return new Date().getSeconds();
}

export function date(){
    return new Date().getDate();
}