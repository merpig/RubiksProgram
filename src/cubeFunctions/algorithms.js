const sizeLimit = 30;

const cross = "01R 01R 01L' 01D 01F 01F 01R' 01D' 01R' 01L 01U' 01D 01R 01D 01B 01B 01R' 01U 01D 01D";
const checkerboard = "01U 01U 01D 01D 01R 01R 01L 01L 01F 01F 01B 01B";
const checkerboard1 = "01U' 01R 01R 01L 01L 01F 01F 01B 01B 01U' 01R 01L 01F 01B' 01U 01F 01F 01D 01D 01R 01R 01L 01L 01F 01F 01U 01U 01F 01F 01U' 01F 01F";
const anaconda = "01L 01U 01B' 01U' 01R 01L' 01B 01R' 01F 01B' 01D 01R 01D' 01F'";
const python = "01F 01F 01R' 01B' 01U 01R' 01L 01F' 01L 01F' 01B 01D' 01R 01B 01L 01L";
const sixSpots = "01U 01D' 01R 01L' 01F 01B' 01U 01D'";
const cubex3 = "01U' 01L' 01U' 01F' 01R 01R 01B' 01R 01F 01U 01B 01B 01U 01B' 01L 01U' 01F 01U 01R 01F'";
const rings = "02R 03R 04R 05R 02B' 03B' 04B' 01L 01L 02F 02B 01L 01L 02B' 02D' 03D' 04D' 05D' 02F' 01L 01L 02F 02B 01L 01L 02B' 02D 02D 03D 03D 04D 04D 05D 05D 03R 04R 01U' 03R' 04R' 02D' 03D' 04D' 05D' 03R 04R 01U 02R' 03R' 04R' 05R' 03F' 04F' 03R' 04R' 03F 04F 02F 03F 04F 05F 02L 02L 03L 03L 04L 04L 02F 02F 03R 03R 04R 04R 02B 02B 03B 03B 04B 04B 02L 02L";
const cubex4Twisted = "01B' 02R 02R 02L 02L 01U 01U 02R 02R 02L 02L 01B 01F 01F 01R 01U' 01R 01U 01R 01R 01U 01R 01R 01F' 01U 01F' 01U 02U 01L 02L 01U' 02U' 01F 01F 02F 02F 01D 02D 01R' 02R' 01U 02U 01F 02F 01D 01D 02D 02D 01R 01R 02R 02R";
const cubex2 = "01F 01L 01F 01U' 01R 01U 01F 01F 01L 01L 01U' 01L' 01B 01D' 01B' 01L 01L 01U";

//convertRuwixAlgo("".split(' ').join(''));
const checkboardInCube = convertRuwixAlgo("BDF'B'DL2ULU'BD'RBRD'RL'FU2D");
const wire = convertRuwixAlgo("R L F B R L F B R L F B R2 B2 L2 R2 B2 L2".split(' ').join(''));
const perpendicularLines = convertRuwixAlgo("R2 U2 R2 U2 R2 U2 L2 D2 L2 D2 L2 D2 L2 R2".split(' ').join(''));
const verticalStripes = convertRuwixAlgo("F U F R L2 B D' R D2 L D' B R2 L F U F".split(' ').join(''));
const giftBox = convertRuwixAlgo("U B2 R2 B2 L2 F2 R2 D' F2 L2 B F' L F2 D U' R2 F' L' R'".split(' ').join(''));
const twister = convertRuwixAlgo("F R' U L F' L' F U' R U L' U' L F'".split(' ').join(''));
const spiral = convertRuwixAlgo("L' B' D U R U' R' D2 R2 D L D' L' R' F U".split(' ').join(''));
const fourCrosses = convertRuwixAlgo("U2 R2 L2 F2 B2 D2 L2 R2 F2 B2".split(' ').join(''));
const unionJack = convertRuwixAlgo("U F B' L2 U2 L2 F' B U2 L2 U".split(' ').join(''));
const displaceMotif = convertRuwixAlgo("L2 B2 D' B2 D L2 U R2 D R2 B U R' F2 R U' B' U'".split(' ').join(''));
const viaduct = convertRuwixAlgo("R2 U2 L2 D B2 L2 B2 R2 D' U L' D F' U' R2 F' U B2 U2 R'".split(' ').join(''));
const staircase = convertRuwixAlgo("L2 F2 D' L2 B2 D' U' R2 B2 U' L' B2 L D L B' D L' U".split(' ').join(''));
const wrapped2x2 = convertRuwixAlgo("D' B2 F2 L2 U' F2 R2 D F2 U2 L' B R' U' L' F D' F L D2".split(' ').join(''));
const exchangedDuckFeet = convertRuwixAlgo("U F R2 F' D' R U B2 U2 F' R2 F D B2 R B'".split(' ').join(''));
const pyraminx = convertRuwixAlgo("D L' U R' B' R B U2 D B D' B' L U D'".split(' ').join(''));
const twinPeaks = convertRuwixAlgo("U L2 B2 R2 U R2 D' U L F' U L' D B' U L B' L R' U'".split(' ').join(''));
const cornerPyramid = convertRuwixAlgo("U' D B R' F R B' L' F' B L F R' B' R F' U' D".split(' ').join(''));
const sixTwoOne = convertRuwixAlgo("U B2 D2 L B' L' U' L' B D2 B2".split(' ').join(''));
const yinYang = convertRuwixAlgo("R L B F R L U' D' F' B' U D".split(' ').join(''));
const snakeEyes = convertRuwixAlgo("R2 U2 R2 U2 R2 U2".split(' ').join(''));
const weirdo = convertRuwixAlgo("R' F' U F2 U' F R' F2 D2 F2 D2 F2 D F2 R2 U2".split(' ').join(''));

function convertRuwixAlgo(algoStr){
    return algoStr
        .split('')
        .map((char,i)=>
            (char!=="'"&&char!=="2")?
                " 01"+char:
                char==="2"?
                " 01"+algoStr[i-1]:
                char
                )
        .join('')
        .trim();
}

let bundle = (name,moveSet,rangeLow,rangeHigh) => {
    let sets = [];
    sets.push(
        {
            name : name,
            moves : moveSet,
            worksFor: []
        }
    );
    for (let i = rangeLow; i <= rangeHigh; i++){
            sets[0].worksFor.push(i);
    }
    return sets;
}

let blankBundle = (name) => {
    let cubeSizes = [];
    for(let i = 2; i<=sizeLimit;i++) cubeSizes.push(i);
    return {
        name : name,
        worksFor: cubeSizes
    }
}

let generalizedBundle = (name,moveSet,moveSet2) => {
    let sets = [];
    for (let i = 3; i <= sizeLimit; i++){
        let algoName = name;
        if(name === "Cube x3"){
            algoName=algoName.split('');
            algoName.pop();
            algoName.push(i);
            algoName=algoName.join('');
        }
        sets.push(
            {
                name : algoName,
                moves : generalizerLower(i,moveSet,moveSet2),
                worksFor: [i]
            }
        );
        // Interesting filter but all look the same, so disbaled
        if(i<-1){
            sets.push({
                name : algoName+" (Inverse)",
                moves : generalizerUpper(i,moveSet),
                worksFor: [i]
            });
        }
    }
    return sets;
}

let generalizerLower = (size,moveSet,moveSet2) => {
    const moveParts = [];
    for(let i = 1; i<=Math.floor(size/2); i++){
        if(moveSet2 && i%2) moveParts.push(baseLower(i,moveSet2));
        else moveParts.push(baseLower(i,moveSet));
    }
    return moveParts.join(" ");
}

let baseLower = (depth,moveSet) => {
    const moves = [];
    if (depth>1){
        moveSet.split(" ").forEach(e=>moves.push(move(depth,e.substring(2).toLowerCase())));
    }
    else moveSet.split(" ").forEach(e=>moves.push(move(depth,e.substring(2).toUpperCase())));
    return moves.join(" ");
}

let generalizerUpper = (size,moveSet) => {
    const moveParts = [];
    for(let i = 1; i<=Math.floor(size/2); i++){
        moveParts.push(baseUpper(i,moveSet));
    }
    return moveParts.join(" ");
}

let baseUpper = (depth,moveSet) => {
    const moves = [];
    moveSet.split(" ").forEach(e=>moves.push(move(depth,e.substring(2).toUpperCase())));
    return moves.join(" ");
}

function move(depth,side){
    return ((depth<10? "0":"") + depth + side);
}

let algorithms = [
    blankBundle("None Selected"),
    ...generalizedBundle("Anaconda",anaconda),
    ...generalizedBundle("Cross",cross),
    ...bundle("Cube x2",cubex2,2,4),
    ...generalizedBundle("Cube x3",cubex3),
    ...bundle("Cube x4 Twisted",cubex4Twisted,4,4),
    ...generalizedBundle("Checkerboard",checkerboard),
    ...generalizedBundle("Checkerboard1",checkerboard1),
    ...generalizedBundle("Checkerboard In Cube",checkboardInCube),
    ...generalizedBundle("Corner Pyramid",cornerPyramid),
    ...generalizedBundle("Displaced Motif",displaceMotif),
    ...generalizedBundle("Exchanged Duck Feet",exchangedDuckFeet),
    ...generalizedBundle("Four Crosses",fourCrosses),
    ...generalizedBundle("Gift Box",giftBox),
    ...generalizedBundle("Perpendicular Lines",perpendicularLines),
    ...generalizedBundle("Pyraminx",pyraminx),
    ...generalizedBundle("Python",python),
    ...bundle("Rings",rings,6,6),
    ...generalizedBundle("Six Spots",sixSpots),
    ...generalizedBundle("Six Spots + Cross",sixSpots,cross),
    ...generalizedBundle("Six-Two-One",sixTwoOne),
    ...bundle("Snake Eyes",snakeEyes,3,3),
    ...generalizedBundle("Spiral",spiral),
    ...generalizedBundle("Staircase",staircase),
    ...generalizedBundle("Twin Peaks",twinPeaks),
    ...generalizedBundle("Twister",twister),
    ...generalizedBundle("Union Jack",unionJack),
    ...generalizedBundle("Vertical Stripes",verticalStripes),
    ...generalizedBundle("Viaduct",viaduct),
    ...generalizedBundle("Weirdo",weirdo),
    ...bundle("Wire",wire,3,3),
    ...generalizedBundle("Wrapped 2x2",wrapped2x2),
    ...generalizedBundle("Yin Yang",yinYang),
]

export default algorithms;