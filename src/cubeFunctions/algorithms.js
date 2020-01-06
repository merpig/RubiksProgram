let algorithms = {
    cross : {
        name : "Cross",
        moves: "01R2 01L' 01D 01F2 01R' 01D' 01R' 01L 01U' 01D 01R 01D 01B2 01R' 01U 01D2"
    },
    cube2 : {
        name : "Cube x2",
        moves: "01F 01L 01F 01U' 01R 01U 01F2 01L2 01U' 01L' 01B 01D' 01B' 01L2 01U"
    },
    cube3 : {
        name : "Cube x3",
        moves: "01U' 01L' 01U' 01F' 01R2 01B' 01R 01F 01U 01B2 01U 01B' 01L 01U' 01F 01U 01R 01F'",

        //4x4, figure out smarter way to call this
        moves1: "01B' 02R2 02L2 01U2 02R2 02L2 01B 01F2 01R 01U' 01R 01U 01R2 01U 01R2 01F' 01U 01F' 01U 02U 01L 02L 01U' 02U' 01F2 02F2 01D 02D 01R' 02R' 01U 02U 01F 02F 01D2 02D2 01R2 02R2"
    },
    sixSpots : {
        name : "Six Spots",
        moves : "01U 01D' 01R 01L' 01F 01B' 01U 01D'"
    },
    checkerBoard : {
        name : "CheckerBoard",
        moves : "01U2 01D2 01R2 01L2 01F2 01B2"
    },
    checkerBoard1 : {
        name : "Checkerboard1",
        moves : "01U' 01R2 01L2 01F2 01B2 01U' 01R 01L 01F 01B' 01U 01F2 01D2 01R2 01L2 01F2 01U2 01F2 01U' 01F2"
    }
}

export default algorithms;