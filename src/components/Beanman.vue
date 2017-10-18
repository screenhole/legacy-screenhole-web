<template>
    <div id="beanman">
        <div id="grab" v-bind:style="{ backgroundImage: 'url(' + backgroundImage + ')' }"></div>

        <svg id="head" width="1920" height="1200" viewBox="0 0 1920 1200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <mask id="head-cutout">
                    <rect width="100%" height="100%" fill="white"/>
                    <polygon points="
                        519.00  596.00,
                        528.13  621.40,
                        537.25  642.80,
                        548.88  666.20,
                        566.50  689.60,
                        588.38  714.00,
                        614.25  738.40,
                        645.13  761.80,
                        684.00  785.21,
                        608.00  911.41,
                        642.75  938.54,
                        677.50  960.66,
                        725.25  984.79,
                        775.00  1002.91,
                        817.75  1015.54,
                        862.50  1024.16,
                        906.25  1027.79,
                        950.00  1031.41,
                        1024.00 928.21,
                        1064.19 932.57,
                        1102.38 934.93,
                        1141.56 934.29,
                        1180.75 931.65,
                        1220.44 927.52,
                        1258.13 921.38,
                        1297.81 912.24,
                        1337.50 901.10,
                        1341.63 806.58,
                        1300.69 803.31,
                        1259.75 794.05,
                        1243.28 788.04,
                        1226.81 778.04,
                        1219.08 769.54,
                        1211.34 761.03,
                        1203.88 750.03,
                        1250.64 760.90,
                        1291.41 761.77,
                        1335.17 761.64,
                        1378.94 755.51,
                        1334.97 681.76,
                        1431.00 662.00,
                        1316.00 530.79,
                        1312.13 491.02,
                        1302.25 451.24,
                        1284.38 410.47,
                        1258.50 371.69,
                        1195.75 313.14,
                        1127.00 272.59,
                        1035.25 238.34,
                        943.50  226.09,
                        851.75  226.84,
                        803.38  236.21,
                        757.00  249.59,
                        711.25  266.89,
                        665.50  290.19,
                        619.25  324.49,
                        573.00  370.79,
                        533.50  428.60,
                        516.00  484.40,
                        511.75  515.30,
                        509.50  546.20
                    "/>
                </mask>
            </defs>

            <rect id="head-fill" width="100%" height="100%" fill="black" mask="url(#head-cutout)"/>
        </svg>

        <svg id="brain" width="1920" height="1200" viewBox="0 0 1920 1200" xmlns="http://www.w3.org/2000/svg">
            <filter id="f1" width="150%" height="150%">
                <feOffset result="offOut" in="SourceGraphic" dx="-4" dy="-5"/>
                <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2"/>
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal"/>
            </filter>

            <polygon filter="url(#f1)" id="brain" fill="black" points="
                607.00  567.00,
                625.75  609.35,
                652.50  645.71,
                670.25  662.56,
                685.13  672.98,
                710.00  683.41,
                721.19  683.41,
                732.38  683.41,
                758.75  675.41,
                807.50  647.41,
                857.25  612.41,
                905.00  583.41,
                959.00  555.31,
                1012.00 535.21,
                1118.00 494.00,
                1142.03 479.42,
                1158.06 464.85,
                1164.09 447.77,
                1154.13 414.70,
                1120.25 374.40,
                1074.50 341.79,
                1030.75 322.69,
                987.00  310.59,
                919.75  303.09,
                862.50  306.59,
                824.16  313.21,
                783.81  323.84,
                712.13  357.09,
                688.56  373.84,
                679.78  380.21,
                671.00  388.59,
                650.25  407.89,
                629.50  433.19,
                616.00  457.79,
                606.00  487.10,
                602.00  516.40,
                602.50  541.70
            "/>
        </svg>

        <svg id="eye" width="1920" height="1200" viewBox="0 0 1920 1200" xmlns="http://www.w3.org/2000/svg">
            <polygon id="eye" fill="black" points="
                1146.00 632.00,
                1150.75 640.55,
                1157.50 647.10,
                1169.00 654.21,
                1198.00 660.41,
                1239.00 650.71,
                1255.50 636.85,
                1265.00 615.00,
                1263.00 597.29,
                1239.00 573.44,
                1221.00 568.02,
                1198.00 567.59,
                1174.50 573.59,
                1153.00 589.59,
                1145.50 605.79
            "/>
        </svg>
    </div>
</template>

<script>
import ActionCable from 'actioncable';

export default {
    data () {
        return {
            backgroundImage: '',
            grabs: [],
        };
    },
    mounted(){
        var self = this;

        this.$http.get("/shots").then((response) => {
            this.grabs = this.grabs.concat(response.data.shots);

            this.backgroundImage = this.grabs[0].image_public_url;
        });

        this.cable = ActionCable.createConsumer(this.$http.defaults.baseURL.replace('http', 'ws') + '/cable');

        this.cable.subscriptions.create(
            "ShotsChannel",
            {
                received: function(data) {
                    self.grabs.unshift(data.shot);

                    self.backgroundImage = self.grabs[0].image_public_url;
                }
            }
        );
    },
}
</script>

<style lang="scss" scoped>
    #beanman {
        position: absolute;
        top: 0;
        left: 0;
        width: 1920px;
        height: 1200px;
        z-index: 9999999;

        #grab {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 1920px;
            height: 1200px;
            background: center repeat #000;
        }

        #head, #brain, #eye {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 1920px;
            height: 1200px;
        }
    }
</style>
