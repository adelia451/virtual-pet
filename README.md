# Pixel - Virtual Pet CLI

A shared virtual cat you take care of from your terminal.  

Commands you run affect the stats of the pet that are visible from [virtualPet.mimobox.sh](https://virtualPet.mimobox.sh)

## Setup

Clone the repository and run the setup:

```bash
git clone https://github.com/adelia451/virtual-pet.git ~/virtual-pet
bash ~/virtual-pet/setup
```
\
The setup script walks you through configuration options:

1. Cron for automatic stat updates
    - Yes: Your local repo will automatically check for updates from GitHub at regular intervals.
    - No: You will need to manually pull updates from GitHub using git pull
2. Aliases for commands
    - Yes: You can use commands like `feed`, `play`, `rest`, etc., directly into your terminal.
    - No: You must run the full path every time, e.g.:
    
    ```bash
    bash ~/virtual-pet/scripts/virtualPet
    bash ~/virtual-pet/scripts/play
    ```


