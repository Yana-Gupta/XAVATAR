
const NUM_OF_COLORS = 6;

function generateRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


export const getColor = async (): Promise<Array<string>> => {
    var color: Array<string> = []
    for (var i = 0; i < NUM_OF_COLORS; i++) {
        color.push(generateRandomHexColor())
    }
    return color
}


export const getUpperWord = (name: string): string => {
    let uw: Array<string>
    uw = name.split(' ').map((word) => {
        return word[0]
    })
    let upperword: string = '';
    for (let i = 0; i < uw.length; i++) {
        upperword += uw[i] + ' '
    }
    return upperword
}