
export default class LeaderboardScene extends Phaser.Scene {
    constructor() {
        super('LeaderboardScene');
    }

    preload() {
        function loadFont(name, url) {
            var newFont = new FontFace(name, `url(${url})`);
            newFont.load().then(function (loaded) {
                document.fonts.add(loaded);
            }).catch(function (error) {
                return error;
            });
        }
        loadFont('PressStart', "client/src/Fonts/PressStart2P.ttf")
    }

    create() {
        
        
        const url = 'http://127.0.0.1:8086/api/leaderboards/';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Process the retrieved data
                let placeStr = "";
                let nameStr = "";
                let timeStr = "";
                let count = 1;
                console.log(data.length)

                if(data.length < 10){
                    for(let i = 0; i<data.length; i++){
                        let point = data[i];
                        placeStr += count.toString() + "\n";
                        nameStr += point["name"] + "\n";
                        timeStr += point['time'] + "\n";
                        count ++;
                    }
                }
                else {
                    for(let i = 0; i<10; i++){
                        let point = data[i];
                        placeStr += count.toString() + "\n";
                        nameStr += point["name"] + "\n";
                        timeStr += point['time'] + "\n";
                        count ++;
                    }
                }
               

                this.add.text(300, 125, "Place \n" + placeStr, {fontSize: '30px'});
                this.add.text(450, 125, "Name \n" + nameStr, {fontSize: '30px'});
                this.add.text(600, 125, "Time \n" + timeStr, {fontSize: '30px'})
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
            });

        this.add.text(300, 10, 'Leaderboard', { fontSize: '69px', align:'center', fontFamily:"" });
    }

    update() {

    }

}