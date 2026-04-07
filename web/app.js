// fetch status from server every 3 seconds
setInterval(() => {
    fetch('https://virtualPet.mimobox.sh/status')
        .then(res => res.json())
        .then(pet => {

            // update bars
            document.getElementById('hunger-fill').style.width = pet.hunger + '%'
            document.getElementById('happiness-fill').style.width = pet.happiness + '%'
            document.getElementById('energy-fill').style.width = pet.energy + '%'
            document.getElementById('health-fill').style.width = pet.health + '%'

            //update text
            document.getElementById('hunger-val').textContent = pet.hunger
            document.getElementById('happiness-val').textContent = pet.happiness
            document.getElementById('energy-val').textContent = pet.energy
            document.getElementById('health-val').textContent = pet.health

            // image swap
            const img = document.getElementById('pixel-image')

            if (pet.hunger >= 75 && pet.happiness >= 75 && pet.energy >= 75 && pet.health >=75){
                img.src = 'happy.png'
            } else if (pet.hunger <=45 || pet.happiness <= 45 || pet.energy <= 45 || pet.health <= 45 ){
                img.src = 'sad.png'
            } else {
                img.src = 'neutral.png'
            }
        })
        .catch(() => {
        console.log("server unreachable")
        })
}, 3000)
