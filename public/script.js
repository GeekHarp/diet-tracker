// const userInput = document.getElementById(`calories-input`);
// const button = document.getElementById(`input-button`);

// parseFloat(userInput.value);
// const userSubmit = () => {
//     // Make new request
//     const request = new XMLHttpRequest();
//     // Listen for it..
//     request.addEventListener(`load`, responseHandler);
//     // Goes to this URL to grab stuff..
//     const url = `http://localhost:3000/grabdata`
//     request.open(`get`, url);
//     // send the request
//     request.send();
// }

// Code to run when we receive the request..
var responseHandler = () => {
    console.log(this.responseText);
    var response = JSON.parse(this.responseText);
    // console.log(response);

    // console.log(`statusText = ${this.statusText}`); // OK
    // console.log(`status code = ${this.status}`); // 200
    // const ctx = document.getElementById(`myChart`);

    // // Global Options
    // // Chart.defaults.global.defaultFontFamily = '';
    // // Chart.defaults.global.defaultFontSize = ;
    // // Chart.defaults.global.defaultFontColor = '';

    // const myPieChart = new Chart(ctx, {
    //     type: 'pie',
    //     data: {
    //         // These labels appear in the legend and in the tooltips when hovering different arcs
    //         labels: ['Calories Consumed', 'Calories Left'],
    //         datasets: [
    //         {
    //             backgroundColor: ['#ff0000','#00ff00'],
    //             data: [response.consumed, response.remaining]
    //         }
    //         ]
    //     }
    // });
};

window.onload = function(){
    // button.addEventListener(`click`, function(){
        // Create a new req
        var request = new XMLHttpRequest();
        // Listen for the req(?)
        request.addEventListener("load", responseHandler);
        // Goes to the below link and 'grab' stuff
        var url = "http://localhost:3000/grabdata";
        request.open("GET", url);
        // Send the req
        request.send();
    // })
}