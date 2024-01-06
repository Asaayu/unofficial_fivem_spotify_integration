import '@welldone-software/why-did-you-render';
import whyDidYouRender from '@welldone-software/why-did-you-render';
import React from 'react';
import isDev from './app/utils/isDev';

if (isDev()) {
    whyDidYouRender(React, {
        trackAllPureComponents: true,
    });
}
