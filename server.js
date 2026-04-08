const fs = require('fs')
const express = require('express')
const app = express()

// Use absolute path for static files because PM2 may run the app
// from a different working directory, causing Express to not find /web
// (this caused "Cannot GET /" before).
// path.join ensures the correct path across environments
const path = require('path')
app.use(express.static(path.join(__dirname, 'web')))

// read pet.json
function loadPet() {
    const pet = JSON.parse(fs.readFileSync('pet.json', 'utf8'))

    const now = Date.now()

    if (!pet.lastHunger) pet.lastHunger = now
    if (!pet.lastHappiness) pet.lastHappiness = now
    if (!pet.lastEnergy) pet.lastEnergy = now
    if (!pet.lastHealth) pet.lastHealth = now

    return pet
}

// save pet.json back
function savePet(pet) {
    fs.writeFileSync('pet.json', JSON.stringify(pet, null, 2))
}

// decay
function applyDecay(pet){
    const now = Date.now()

    const hungerHours = (now - pet.lastHunger) / 3600000
    const happinessHours = (now - pet.lastHappiness) / 3600000
    const energyHours = (now - pet.lastEnergy) / 3600000
    const healthHours = (now - pet.lastHealth) / 3600000

    pet.hunger = Math.max(0, Math.min(100, 
        pet.hunger - Math.floor(hungerHours * 2 )
    ))
    pet.happiness = Math.max(0, Math.min(100,
        pet.happiness - Math.floor(happinessHours * 2 )
    ))
    pet.energy = Math.max(0, Math.min(100,
        pet.energy - Math.floor(energyHours * 2 )
    ))
    pet.health = Math.max(0, Math.min(100, 
        pet.health - Math.floor(healthHours * 2 )
    ))

    pet.lastHunger = now
    pet.lastHappiness = now
    pet.lastEnergy = now
    pet.lastHealth = now
    
    return pet
}


// status endpoint for webpage
app.get('/status', (req, res) => {
    const pet = loadPet()
    applyDecay(pet)
    savePet(pet)
    res.json(pet)
})

// HUNGER ----------
app.post(['/feed', '/fish'], (req, res) => {
    const pet = loadPet()
    applyDecay(pet)

    pet.hunger = Math.min(100, pet.hunger + 4)
    pet.lastHunger = Date.now()

    savePet(pet)
    res.end()
})

// HAPPINESS ----------
app.post(['/explore', '/pat'], (req, res) => {
    const pet = loadPet()
    applyDecay(pet)

    pet.happiness = Math.min(100, pet.happiness + 2)
    pet.lastHappiness = Date.now()

    savePet(pet)
    res.end()
})

//ENERGY ----------
app.post(['/play', '/rest'], (req, res) => {
    const pet = loadPet()
    applyDecay(pet)

    pet.energy = Math.min(100, pet.energy + 2)
    pet.lastEnergy = Date.now()
    
    savePet(pet)
    res.end()
})

// HEALTH ----------
app.post(['/clean', '/train'], (req, res) => {
    const pet = loadPet()
    applyDecay(pet)

    pet.health = Math.min(100, pet.health + 2)
    pet.lastHealth = Date.now()

    savePet(pet)
    res.end()
})

app.listen(3000, () => console.log('running on port 3000'))
