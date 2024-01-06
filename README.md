# Unofficial FiveM Spotify Integration

### Unofficial FiveM Spotify Integration is a resource to allow you to control your playback, and easily listen to music in-game while playing FiveM.

---

## How this software works

This software uses a local web app running in your browser to run the Spotify Web Playback SDK, then uses a Peer to Peer connection to send the player data between your browser and the FiveM client. This allows you to control your playback, and listen to music in-game without having to alt-tab out of the game. This also allows you to listen to music without requiring the Spotify desktop app to be installed, but it will continue to work if the Spotify desktop app is open.

---

## EULA & Privacy Policy

Upon usage of this software and any accompanying data for use with this software you are agreeing to this softwares [end-user license agreement](https://github.com/Asaayu/unofficial_fivem_spotify_integration/blob/main/EULA.md), and the collection of your data by this software is subject to this softwares [privacy policy](https://github.com/Asaayu/unofficial_fivem_spotify_integration/blob/main/PRIVACY-POLICY.md).

If you do not wish to agree to this end-user license agreement or privacy policy, then immediately delete all files you have downloaded for use with this software, including files this software has created or downloaded from the Spotify Service.

---

## Authorization Scopes

Scopes provide Spotify users using third-party apps the confidence that only the information they choose to share will be shared, and nothing more.
You can find a list of all the available scopes [on the Spotify developer website](https://developer.spotify.com/documentation/general/guides/scopes/).

### **This software uses the following scopes:**

-   [streaming](https://developer.spotify.com/documentation/general/guides/scopes/#streaming)
-   [user-read-email](https://developer.spotify.com/documentation/general/guides/scopes/#user-read-email)
-   [user-read-private](https://developer.spotify.com/documentation/general/guides/scopes/#user-read-private)
-   [user-read-playback-state](https://developer.spotify.com/documentation/general/guides/scopes/#user-read-playback-state)
-   [user-modify-playback-state](https://developer.spotify.com/documentation/general/guides/scopes/#user-modify-playback-state)
-   [playlist-read-private](https://developer.spotify.com/documentation/general/guides/scopes/#playlist-read-private)
-   [playlist-read-collaborative](https://developer.spotify.com/documentation/general/guides/scopes/#playlist-read-collaborative)
-   [user-library-read](https://developer.spotify.com/documentation/general/guides/scopes/#user-library-read)

### **These scopes are used for the following purposes:**

-   **streaming** - Allows the software to stream music from the Spotify Service to your browser using the Spotify Web Playback SDK.
-   **user-read-email** - Required to access the Spotify Web Playback SDK. Your email address is never accessed by this software.
-   **user-read-private** - Allows the software to get information about your Spotify account that is considered private, used to identify your country of residence to relink tracks that are not available in your region.
-   **user-read-playback-state** - Allows the software to get information about the current playback state (play, pause, skip, seek, etc.) of your Spotify account.
-   **user-modify-playback-state** - Allows the software to control the playback state (play, pause, skip, seek, etc.) of your Spotify account.
-   **playlist-read-private** - Allows the software to get information about your private playlists.
-   **playlist-read-collaborative** - Allows the software to get information about your collaborative playlists.
-   **user-library-read** - Allows the software to get information about your saved library.

---

## Telemetry Information

The Spotify Developer Dashboard displays the following telemetry data,

-   Daily Active Users - The number of users who used the application on that day.
-   Monthly Active Users - The number of users who used the application within the last 30 days of that day.
-   Number of Requests/Endpoint - The total number of requests sent to an endpoint.
-   Total Number of Requests - The total number of requests on that day.
-   Number of Users Per Country - A color shaded map which shows the ratio of users from each country who used the application on the previous day.

---

## Legal Information

This software is not approved, sponsored, nor endorsed by Spotify USA, Inc, Spotify AB, or Rockstar Games.

This software does not broadcast any music, nor does it allow you to download any music.

_All trademarks, service marks, trade names, logos, domain names, and any other features of a brand are the sole property of their respective owners or licensors._

**Please make sure you are up to date with Spotify's [privacy policy](https://www.spotify.com/us/legal/privacy-policy/), [terms and conditions of use](https://www.spotify.com/us/legal/end-user-agreement/), and [copyright policy](https://www.spotify.com/us/legal/copyright-policy/).**

**You should also be aware of what [content you share with Spotify](https://www.spotify.com/us/privacy).**

**Residents of the United States please read Spotify's [Supplemental U.S. State Privacy Notice](https://www.spotify.com/us/legal/notice-at-collection/)**

**Residents of the European Union please read Spotify's [GDPR article 15 information](https://support.spotify.com/us/article/gdpr-article-15-information/)**

**No personally identifiable information is sent from the users computer to any third party services, except for the Spotify Service, and the associated website for this software.**

**To remove this applications access to your Spotify account visit your [Spotify account apps page](https://www.spotify.com/us/account/apps/) and click _REMOVE ACCESS_ beside the "Unofficial FiveM Spotify Integration" application**

This software uses the [FiveM React and Lua Boilerplate](https://github.com/project-error/fivem-react-boilerplate-lua).

### FiveM React and Lua Boilerplate License:

```
Copyright (c) 2021 Project Error

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.
```

ALL COPIES OF THIS SOFTWARE MUST CONTAIN THIS README, THE LICENSE, SOFTWARE END-USER LICENSE AGREEMENT, AND PRIVACY POLICY.

# Development Information

## Requirements

-   [Node > v10.6](https://nodejs.org/en/)
-   [pnpm](https://pnpm.io/installation)

### Lua Utilities

**SendReactMessage**

This is a small wrapper for dispatching NUI messages. This is designed
to be used with the `useNuiEvent` React hook.

Signature

```lua
---@param action string The action you wish to target
---@param data any The data you wish to send along with this action
SendReactMessage(action, data)
```

Usage

```lua
SendReactMessage('setVisible', true)
```

**debugPrint**

A debug printing utility that is dependent on a convar,
if the convar is set this will print out to the console.

The convar is dependent on the name given to the resource.
It follows this format `YOUR_RESOURCE_NAME-debugMode`

To turn on debugMode add `setr YOUR_RESOURCE_NAME-debugMode 1` to
your server.cfg or use the `setr` console command instead.

Signature (Replicates `print`)

```lua
---@param ... any[] The arguments you wish to send
debugPrint(...)
```

Usage

```lua
debugPrint('wow cool string to print', true, someOtherVar)
```

### React Utilities

Signatures are not included for these utilities as the type definitions
are sufficient enough.

**useNuiEvent**

This is a custom React hook that is designed to intercept and handle
messages dispatched by the game scripts. This is the primary
way of creating passive listeners.

_Note: For now handlers can only be registered a single time. I haven't
come across a personal use case for a cascading event system_

**Usage**

```jsx
const MyComp: React.FC = () => {
    const [state, setState] = useState('');

    useNuiEvent <
        string >
        ('myAction',
        (data) => {
            // the first argument to the handler function
            // is the data argument sent using SendReactMessage

            // do whatever logic u want here
            setState(data);
        });

    return (
        <div>
            <h1>Some component</h1>
            <p>{state}</p>
        </div>
    );
};
```

**fetchNui**

This is a simple NUI focused wrapper around the standard `fetch` API.
This is the main way to accomplish active NUI data fetching
or to trigger NUI callbacks in the game scripts.

When using this, you must always at least callback using `{}`
in the game scripts.

_This can be heavily customized to your use case_

**Usage**

```ts
// First argument is the callback event name.
fetchNui<ReturnData>('getClientData')
    .then((retData) => {
        console.log('Got return data from client scripts:');
        console.dir(retData);
        setClientData(retData);
    })
    .catch((e) => {
        console.error('Setting mock data due to error', e);
        setClientData({ x: 500, y: 300, z: 200 });
    });
```

**debugData**

This is a function allowing for mocking dispatched game script
actions in a browser environment. It will trigger `useNuiEvent` handlers
as if they were dispatched by the game scripts. **It will only fire if the current
environment is a regular browser and not CEF**

**Usage**

```ts
// This will target the useNuiEvent hooks registered with `setVisible`
// and pass them the data of `true`
debugData([
    {
        action: 'setVisible',
        data: true,
    },
]);
```

**Misc Utils**

These are small but useful included utilities.

-   `isEnvBrowser()` - Will return a boolean indicating if the current
    environment is a regular browser. (Useful for logic in development)

## Development Workflow

This boilerplate was designed with development workflow in mind.
It includes some helpful scripts to accomplish that.

**Hot Builds In-Game**

When developing in-game, you can use the hot build system by
running the `start:game` script. This is essentially the start
script but it writes to disk. Meaning all that is required is a
resource restart to update the game script

**Usage**

```sh
pnpm start:game
```

**Production Builds**

When you are done with development phase for your resource. You
must create a production build that is optimized and minimized.

You can do this by running the following:

```sh
pnpm build
```
