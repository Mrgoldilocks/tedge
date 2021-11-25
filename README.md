# Tedge

Tedge is a proxy service hosted on Vercel

## Why?

The big fear about proxy services is that you are unsure who's in control of them. This means someone could be monitoring your traffic and poking around your stuff.
With an open source proxy, we know that all requests sent through Lanyard Tedge will be unmonitored and anonymized.

## Setup

+ `$ git clone https://github.com/lanyard-private/tedge`
+ `$ cd tedge && yarn`
+ `$ yarn dev` to start a test development server
+ `$ yarn run vercel dev` to start the proxy locally

## Possible Concerns

Of course, right now Vercel could monitor the traffic if they wanted to. However, because their data is seperate from the target website, it is impossible for them
to derive which user is requesting what resource. The only downside is if they collude with the target side which seems unlikely for both parties.

## Possible Alternatives

In the future, this project may be replaced with a decentralized P2P VPN or proxy network, such as <a href="https://www.mysteriumvpn.com">Mysterium</a>.
