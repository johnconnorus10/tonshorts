export const colorRank = (points) => {

    const p = Number(points);

    if(p >= 100 && p < 300) {
        return("copper");

    } else if(p >= 300 && p < 1000) {
        return("bronze");

    } else if(p >= 1000 && p < 10000) {
        return("silver");

    } else if(p >= 10000) {
        return("gold");
    }

    return("iron"); 
};

export const secToObj = (s) => {
    let m = Math.trunc(s / 60) + ''
    s = (s % 60) + ''
    return ({m: Number(m.padStart(2, 0)), s: Number(s.padStart(2, 0))});
}