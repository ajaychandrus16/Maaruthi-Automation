/* =========================================================
   MAARUTHI AUTOMATION
   LIVE LOOM DASHBOARD SIMULATOR
   STEP 10
   ========================================================= */


/* =========================================================
   LOOM DATA
   ========================================================= */

const looms = [
    {
        number: 1,
        status: "Running",
        rpm: 520,
        pick: 480,
        efficiency: 95.2,
        production: 412
    },

    {
        number: 2,
        status: "Running",
        rpm: 515,
        pick: 475,
        efficiency: 93.8,
        production: 398
    },

    {
        number: 3,
        status: "Running",
        rpm: 502,
        pick: 460,
        efficiency: 92.1,
        production: 365
    },

    {
        number: 4,
        status: "Stopped",
        rpm: 0,
        pick: 0,
        efficiency: 0,
        production: 210
    },

    {
        number: 5,
        status: "Running",
        rpm: 518,
        pick: 470,
        efficiency: 94.6,
        production: 402
    },

    {
        number: 6,
        status: "Running",
        rpm: 521,
        pick: 482,
        efficiency: 96.1,
        production: 418
    },

    {
        number: 7,
        status: "Running",
        rpm: 499,
        pick: 455,
        efficiency: 90.8,
        production: 360
    },

    {
        number: 8,
        status: "Running",
        rpm: 507,
        pick: 468,
        efficiency: 92.9,
        production: 384
    },

    {
        number: 9,
        status: "Stopped",
        rpm: 0,
        pick: 0,
        efficiency: 0,
        production: 195
    },

    {
        number: 10,
        status: "Running",
        rpm: 516,
        pick: 472,
        efficiency: 93.5,
        production: 401
    },

    {
        number: 11,
        status: "Running",
        rpm: 503,
        pick: 462,
        efficiency: 91.7,
        production: 372
    },

    {
        number: 12,
        status: "Running",
        rpm: 519,
        pick: 478,
        efficiency: 95.0,
        production: 425
    }
];


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function randomDecimal(min, max, decimals = 1) {

    const value =
        Math.random() * (max - min) + min;

    return Number(value.toFixed(decimals));
}


function getCurrentTime() {

    const now = new Date();

    return now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });

}


/* =========================================================
   GET STATUS CLASS
   ========================================================= */

function getStatusClass(status) {

    if (status === "Running") {
        return "running";
    }

    if (status === "Stopped") {
        return "stopped";
    }

    return "";
}


/* =========================================================
   UPDATE LOOM TABLE
   ========================================================= */

function updateLoomTable() {

    const tableBody =
        document.querySelector(".loom-table tbody");

    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = "";


    looms.forEach((loom) => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>${loom.number}</strong>
            </td>

            <td>
                <span class="status ${getStatusClass(loom.status)}">
                    ${loom.status}
                </span>
            </td>

            <td>
                ${loom.rpm}
            </td>

            <td>
                ${loom.pick}
            </td>

            <td>
                ${loom.efficiency.toFixed(1)}
            </td>

            <td>
                ${loom.production}
            </td>

            <td>
                ${getCurrentTime()}
            </td>

        `;


        tableBody.appendChild(row);

    });

}


/* =========================================================
   UPDATE KPI CARDS
   ========================================================= */

function updateKPIs() {

    const totalLooms =
        looms.length;


    const runningLooms =
        looms.filter(
            loom => loom.status === "Running"
        ).length;


    const stoppedLooms =
        looms.filter(
            loom => loom.status === "Stopped"
        ).length;


    const runningEfficiencies =
        looms
            .filter(loom => loom.status === "Running")
            .map(loom => loom.efficiency);


    let averageEfficiency = 0;


    if (runningEfficiencies.length > 0) {

        const totalEfficiency =
            runningEfficiencies.reduce(
                (sum, value) => sum + value,
                0
            );

        averageEfficiency =
            totalEfficiency /
            runningEfficiencies.length;

    }


    const totalProduction =
        looms.reduce(
            (sum, loom) => sum + loom.production,
            0
        );


    const totalLoomElement =
        document.querySelector(".kpi-grid .kpi-card:nth-child(1) strong");

    const runningLoomElement =
        document.querySelector(".kpi-grid .kpi-card:nth-child(2) strong");

    const stoppedLoomElement =
        document.querySelector(".kpi-grid .kpi-card:nth-child(3) strong");

    const efficiencyElement =
        document.querySelector(".kpi-grid .kpi-card:nth-child(4) strong");

    const productionElement =
        document.querySelector(".kpi-grid .kpi-card:nth-child(5) strong");


    if (totalLoomElement) {
        totalLoomElement.textContent =
            totalLooms;
    }


    if (runningLoomElement) {
        runningLoomElement.textContent =
            runningLooms;
    }


    if (stoppedLoomElement) {
        stoppedLoomElement.textContent =
            stoppedLooms;
    }


    if (efficiencyElement) {
        efficiencyElement.textContent =
            `${averageEfficiency.toFixed(1)}%`;
    }


    if (productionElement) {
        productionElement.textContent =
            `${totalProduction.toLocaleString("en-IN")} m`;
    }

}


/* =========================================================
   SIMULATE LOOM DATA
   ========================================================= */

function simulateLoomData() {

    looms.forEach((loom) => {

        /*
         * Randomly change loom status occasionally.
         */

        const statusChance =
            Math.random();


        if (statusChance < 0.03) {

            if (loom.status === "Running") {

                loom.status = "Stopped";

            } else {

                loom.status = "Running";

            }

        }


        /*
         * Running loom values
         */

        if (loom.status === "Running") {

            loom.rpm =
                randomNumber(495, 525);


            loom.pick =
                randomNumber(450, 485);


            loom.efficiency =
                randomDecimal(89.5, 97.5);


            /*
             * Production increases
             */

            const productionIncrease =
                randomDecimal(0.2, 1.2);


            loom.production =
                Number(
                    (
                        loom.production +
                        productionIncrease
                    ).toFixed(1)
                );

        }


        /*
         * Stopped loom values
         */

        else {

            loom.rpm = 0;

            loom.pick = 0;

            loom.efficiency = 0;

        }

    });


    updateLoomTable();

    updateKPIs();

}


/* =========================================================
   UPDATE DATE
   ========================================================= */

function updateDate() {

    const dateElement =
        document.querySelector(
            ".date span"
        );


    if (!dateElement) {
        return;
    }


    const now = new Date();


    dateElement.textContent =
        now.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

}


/* =========================================================
   INITIAL LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateLoomTable();

        updateKPIs();

        updateDate();

    }
);


/* =========================================================
   LIVE SIMULATION
   ========================================================= */

/*
 * Update every 3 seconds.
 */

setInterval(
    simulateLoomData,
    3000
);


/*
 * Update date every minute.
 */

setInterval(
    updateDate,
    60000
);