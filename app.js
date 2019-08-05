window.addEventListener('load', () => {
    let longitude;
    let lattitude;
    let desc = document.querySelector('.temperature-description');
    let temp = document.querySelector('.temperature-degree');
    let location = document.querySelector('.location-timezone');
    let temp_section = document.querySelector('.temperature');
    let temp_span = document.querySelector('.temperature span');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            lattitude = position.coords.latitude;


            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/42ad48c959d1523e654843bfaa715c39/${lattitude},${longitude}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    // Set elements
                    temp.textContent = temperature;
                    desc.textContent = summary;
                    location.textContent = data.timezone;
                    let celsius = (temperature - 32) * (5 / 9);
                    // Icon Animation
                    setIcons(icon, document.querySelector('.icon'));
                    // Change temp to celsius
                    temp_section.addEventListener('click', () => {
                        if (temp_span.textContent === "F") {
                            temp_span.textContent = "C";
                            temp.textContent = Math.floor(celsius);
                        } else {
                            temp_span.textContent = "F";
                            temp.textContent = temperature;

                        }
                    })
                });
        });


    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});