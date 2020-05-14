Vertical metrics determine the baseline in a text and the space between lines of text. For historical reasons, there are three pairs of ascender/descender values, known as hhea, OS/2 and uSWin metrics. Depending on the font, operating system and application a different set will be used to render text on the screen. The browser too.

Mac
On the Mac, Safari and Chrome use the hhea values to render text. Firefox will respect the useTypoMetrics setting and will use the OS/2 if it is set. Otherwise it will use the hhea metrics

Windows
On Windows, all browsers respect the useTypoMetrics setting. If set, will use the OS/2 metrics, otherwise they will use the usWin metrics
