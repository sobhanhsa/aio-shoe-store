export const commaEmbedder = (raw:number) => {
    let rawString = raw.toString();
    let rawArray = rawString.split("");
    let edited : string = "";
    let j = (rawArray.length % 2) === 0 ? 0 : 1;

    rawArray.forEach((c,i) => {
        if ( (i === 0) && (rawArray.length % 2 !== 0 ) ) {
            edited = c + ",";
        } else if (i === 0) {
            edited = c ;
        }else if (
            ((i + 1 - j) % 3 === 0) && ((i + 1) !== rawArray.length + j)
        ) {
            edited += c + ","
        } else {
            edited += c
        }


    });

    let final = edited[edited.length - 1] === "," 
    ? edited.substring(0, edited.length - 1) 
    : edited

    return final
}