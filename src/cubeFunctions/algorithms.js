let algorithms = [
    {
        name : "Cross",
        moves: "01R 01R 01L' 01D 01F 01F 01R' 01D' 01R' 01L 01U' 01D 01R 01D 01B 01B 01R' 01U 01D 01D",
        worksFor: [3,4]
    },
    {
        name : "Cube x2",
        moves: "01F 01L 01F 01U' 01R 01U 01F 01F 01L 01L 01U' 01L' 01B 01D' 01B' 01L 01L 01U",
        worksFor: [2,3,4]
    },
    {
        name : "Cube x2",
        moves: "02f 02f 02r 02r 02u' 02f' 04d 02b' 02u 02u 02b 02u' 02r' 03R 03R 02b 02b 03R 03R 03f 03f 03L 03L 03B 03B",
        worksFor: [6]
    },
    {
        name : "Cube x3",
        moves: "01U' 01L' 01U' 01F' 01R 01R 01B' 01R 01F 01U 01B 01B 01U 01B' 01L 01U' 01F 01U 01R 01F'",
        worksFor: [3]
    },
    {
        name : "Cube x4",
        moves: "01B' 02R 02R 02L 02L 01U 01U 02R 02R 02L 02L 01B 01F 01F 01R 01U' 01R 01U 01R 01R 01U 01R 01R 01F' 01U 01F' 01U 02U 01L 02L 01U' 02U' 01F 01F 02F 02F 01D 02D 01R' 02R' 01U 02U 01F 02F 01D 01D 02D 02D 01R 01R 02R 02R",
        worksFor: [4]
    },
    {
        name : "Cube x5",
        moves: "01F 01U' 01B 01L 01U' 01F 01F 01U 01U 01F 01U 01F' 01U 01U 01D' 01B 01D 01L 01L 01B 01B 01U 02f 02u' 02b 02l 02u' 02f 02f 02u 02u 02f 02u 02f' 02u 02u 02d' 02b 02d 02l 02l 02b 02b 02u",
        worksFor: [5]
    },
    {
        name : "Six Spots",
        moves : "01U 01D' 01R 01L' 01F 01B' 01U 01D'",
        worksFor: [3,4]
    },
    {
        name : "CheckerBoard",
        moves : "01U 01U 01D 01D 01R 01R 01L 01L 01F 01F 01B 01B",
        worksFor: [3]
    },
    {
        name : "Checkerboard1",
        moves : "01U' 01R 01R 01L 01L 01F 01F 01B 01B 01U' 01R 01L 01F 01B' 01U 01F 01F 01D 01D 01R 01R 01L 01L 01F 01F 01U 01U 01F 01F 01U' 01F 01F",
        worksFor: [3]
    },
    {
        name: "Checkerboard2",
        moves : "01B 01D 01F' 01B' 01D 01L 01L 01U 01L 01U' 01B 01D' 01R 01B 01R 01D' 01R 01L' 01F 01U 01U 01D",
        worksFor: [3]
    },
    {
        name: "Anaconda",
        moves : "01L 01U 01B' 01U' 01R 01L' 01B 01R' 01F 01B' 01D 01R 01D' 01F'",
        worksFor: [3]
    },
    {
        name: "Python",
        moves : "01F 01F 01R' 01B' 01U 01R' 01L 01F' 01L 01F' 01B 01D' 01R 01B 01L 01L",
        worksFor: [3]
    },
    {
        name: "Rings",
        moves: "02R 03R 04R 05R 02B' 03B' 04B' 01L 01L 02F 02B 01L 01L 02B' 02D' 03D' 04D' 05D' 02F' 01L 01L 02F 02B 01L 01L 02B' 02D 02D 03D 03D 04D 04D 05D 05D 03R 04R 01U' 03R' 04R' 02D' 03D' 04D' 05D' 03R 04R 01U 02R' 03R' 04R' 05R' 03F' 04F' 03R' 04R' 03F 04F 02F 03F 04F 05F 02L 02L 03L 03L 04L 04L 02F 02F 03R 03R 04R 04R 02B 02B 03B 03B 04B 04B 02L 02L",
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