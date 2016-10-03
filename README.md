Initial Draft! Not completed!

# MMM-TankMonitor
Water tank monitoring Module for MagicMirror<sup>2</sup>

## Dependencies
  * An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
  * npm
  * [rpi-dht-sensor](https://www.npmjs.com/package/rpi-dht-sensor)

## Installation
 1. Clone this repo into `~/MagicMirror/modules` directory.
 2. Configure your `~/MagicMirror/config/config.js`:

    ```
    {
        module: 'MMM-TankMonitor',
        position: 'top_right',
        config: {
            ...
        }
    }
    ```
 3. Run command `npm install` in `~/MagicMirror/modules/MMM-TankMonitor` directory.
 4. Run command `sudo apt-get install rpi-dht-sensor`.

## Config Options
| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `refreshInterval` | `5000` | Time in milli seconds before successive readings are taken. |
| `tanks` | `'tanks: [{label: "Tank 1",value: 50,},]'` | Tank Details |

## For Developers
Polls the water level and displays in the mirror
