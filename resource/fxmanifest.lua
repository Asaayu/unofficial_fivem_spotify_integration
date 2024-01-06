-- Information about this specific resource
name "unofficial_fivem_spotify_integration"
description "Unofficial FiveM Spotify Integration. Access, control, and listen to Spotify music while playing."
legal "This software is not affiliated, created by, nor endorsed by Spotify, Spotify AB, and Spotify Technology S.A. All Spotify trademarks, service marks, trade names, logos, domain names, and any other features of the Spotify brand (“Spotify Brand Features”) are the sole property of Spotify or its licensors."
version '1.0.0'

-- Files that escrow will ignore
escrow_ignore {
    ''
}

-- Scripts that will be run both client side and server side
shared_scripts {
    'shared/**/*'
}

-- Scripts that will be run only on the client side
client_scripts {
    'client/**/*'
}

-- Scripts that will be run only on the server side
server_scripts {
    'server/**/*'
}

-- Files that will be downloaded by clients
files {
    'web/build/index.html',
	'web/build/**/*',
}

-- Resource dependencies
dependencies {}

-- UI page
ui_page 'web/build/index.html'

-- Loading screen specific data
-- loadscreen { '' }
-- loadscreen_cursor 'yes'
-- loadscreen_manual_shutdown 'yes'

-- Default resource information
author 'Asaayu'
fx_version 'cerulean'
game 'gta5'
lua54 'yes'
tebex 'https://asaayu.tebex.io/'
