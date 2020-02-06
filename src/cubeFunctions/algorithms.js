let algorithms = [
    {
        name : "Cross",
        moves: "01R2 01L' 01D 01F2 01R' 01D' 01R' 01L 01U' 01D 01R 01D 01B2 01R' 01U 01D2",
        worksFor: [3,4]
    },
    {
        name : "Cube x2",
        moves: "01F 01L 01F 01U' 01R 01U 01F2 01L2 01U' 01L' 01B 01D' 01B' 01L2 01U",
        worksFor: [2,3,4]
    },
    {
        name : "Cube x2",
        moves: "02f2 02r2 02u' 02f' 04d 02b' 02u2 02b 02u' 02r' 03R2 02b2 03R2 03f2 03L2 03B2",
        worksFor: [6]
    },
    {
        name : "Cube x3",
        moves: "01U' 01L' 01U' 01F' 01R2 01B' 01R 01F 01U 01B2 01U 01B' 01L 01U' 01F 01U 01R 01F'",
        worksFor: [3]
    },
    {
        name : "Cube x4",
        moves: "01B' 02R2 02L2 01U2 02R2 02L2 01B 01F2 01R 01U' 01R 01U 01R2 01U 01R2 01F' 01U 01F' 01U 02U 01L 02L 01U' 02U' 01F2 02F2 01D 02D 01R' 02R' 01U 02U 01F 02F 01D2 02D2 01R2 02R2",
        worksFor: [4]
    },
    {
        name : "Cube x5",
        moves: "01F 01U' 01B 01L 01U' 01F2 01U2 01F 01U 01F' 01U2 01D' 01B 01D 01L2 01B2 01U 02f 02u' 02b 02l 02u' 02f2 02u2 02f 02u 02f' 02u2 02d' 02b 02d 02l2 02b2 02u",
        worksFor: [5]
    },
    {
        name : "Six Spots",
        moves : "01U 01D' 01R 01L' 01F 01B' 01U 01D'",
        worksFor: [3,4]
    },
    {
        name : "CheckerBoard",
        moves : "01U2 01D2 01R2 01L2 01F2 01B2",
        worksFor: [3]
    },
    {
        name : "Checkerboard1",
        moves : "01U' 01R2 01L2 01F2 01B2 01U' 01R 01L 01F 01B' 01U 01F2 01D2 01R2 01L2 01F2 01U2 01F2 01U' 01F2",
        worksFor: [3]
    },
    {
        name: "Checkerboard2",
        moves : "01B 01D 01F' 01B' 01D 01L2 01U 01L 01U' 01B 01D' 01R 01B 01R 01D' 01R 01L' 01F 01U2 01D",
        worksFor: [3]
    },
    {
        name: "Anaconda",
        moves : "01L 01U 01B' 01U' 01R 01L' 01B 01R' 01F 01B' 01D 01R 01D' 01F'",
        worksFor: [3]
    },
    {
        name: "Python",
        moves : "01F2 01R' 01B' 01U 01R' 01L 01F' 01L 01F' 01B 01D' 01R 01B 01L2",
        worksFor: [3]
    },
    {
        name: "Rings",
        moves: "02R 03R 04R 05R 02B' 03B' 04B' 01L2 02F 02B 01L2 02B' 02D' 03D' 04D' 05D' 02F' 01L2 02F 02B 01L2 02B' 02D2 03D2 04D2 05D2 03R 04R 01U' 03R' 04R' 02D' 03D' 04D' 05D' 03R 04R 01U 02R' 03R' 04R' 05R' 03F' 04F' 03R' 04R' 03F 04F 02F 03F 04F 05F 02L2 03L2 04L2 02F2 03R2 04R2 02B2 03B2 04B2 02L2",
        worksFor: [6]
    },
    {
        name: "Test f depth:2 multi turn",
        moves: "02f 02f'",
        worksFor: []
    },
    {
        name: "Test u depth:2 multi turn",
        moves: "02u 02u'",
        worksFor: []
    },
    {
        name: "Test r depth:2 multi turn",
        moves: "02r 02r'",
        worksFor: []
    },
    {
        name: "Test b depth:2 multi turn",
        moves: "02b 02b'",
        worksFor: []
    },
    {
        name: "Test d depth:2 multi turn",
        moves: "02d 02d'",
        worksFor: []
    },
    {
        name: "Test l depth:2 multi turn",
        moves: "02l 02l'",
        worksFor: []
    },
]

export default algorithms;