exports('pause', function()
    SendReactMessage('export', 'pause')
end)

exports('resume', function()
    SendReactMessage('export', 'resume')
end)

exports('next', function()
    SendReactMessage('export', 'next')
end)

exports('previous', function()
    SendReactMessage('export', 'previous')
end)