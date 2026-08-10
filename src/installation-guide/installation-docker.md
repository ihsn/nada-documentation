# Install with Docker

Docker is a convenient way to run NADA locally or in a containerized environment without manually installing Apache/PHP/MySQL on the host.

## Quick start

An official-style Docker setup is maintained in a separate repository:

**[https://github.com/mah0001/nada-docker](https://github.com/mah0001/nada-docker)**

Follow that repository’s README for:

- Cloning the Docker project
- Building / starting containers (`docker compose` or equivalent)
- Default ports and URLs
- Default credentials (change these before any shared or production use)

## Before you start

- Install [Docker](https://docs.docker.com/get-docker/) (and Docker Compose if not bundled).
- Review [Requirements](./#requirements) so you understand what NADA needs inside the containers (PHP, database, etc.).
- Prefer **PHP 8.x** images when the Docker project offers a choice; minimum supported PHP for NADA is **7.4**.

## After containers are up

1. Open the NADA URL exposed by the compose file (see the Docker repo README).
2. Complete any first-run / installer steps if prompted.
3. Configure [email](./configurations/email) and continue with [Getting started](/getting-started/).

For non-Docker installs, use the full platform guides: [Linux](./platform-linux) · [Windows](./platform-windows).

::: tip Production
Treat the Docker repo as a starting point. Harden credentials, volumes, networking, and HTTPS before production use.
:::

## Related

- [Installation](./) — non-Docker install  
- [Install with Git](./installation-git)  
- [Debug](./debug)  
