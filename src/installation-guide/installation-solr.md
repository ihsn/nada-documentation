# Solr full-text search

[Solr](https://solr.apache.org/) is an **optional** full-text search engine. It is typically faster and more capable than NADA’s built-in database search, especially for large catalogs and variable-level search.

By default NADA uses database search (`search_provider = db`). After Solr is installed and indexed, you switch the catalog to Solr in Site configurations.

## Checklist

1. Install Java and Solr ([Windows](#install-solr-on-windows) or [Linux](#install-solr-on-linux)).
2. Confirm Solr Admin UI at `http://localhost:8983` (or your Solr host).
3. Continue in the admin guide: [Solr search](/admin-guide/web-ui/solr) — connect NADA, create core, schema, index, and enable the search provider.

---

## Requirements

| Component | Notes |
|-----------|--------|
| **Solr** | 9.x recommended (examples below assume Solr 9) |
| **Java** | A JDK version supported by your Solr release — see [Solr system requirements](https://solr.apache.org/guide/) |
| **Network** | PHP/NADA host must reach Solr (often `localhost:8983`) |
| **NADA access** | Site administrator with permission to edit configurations |

Do not expose Solr’s Admin UI (`8983`) to the public internet without authentication and a firewall.

---

## Install Solr on Windows

For a full NADA install on Windows, see [Installation (Windows)](./platform-windows).

### 1. Install Java

1. Install a supported JDK for your Solr version (Windows x64).
2. Set a system environment variable **`JAVA_HOME`** to the JDK folder (for example `C:\Java\jdk-17`).
3. Open a new Command Prompt and run `echo %JAVA_HOME%` to confirm.

### 2. Install Solr

1. Download the Solr 9 binary package from [solr.apache.org/downloads](https://solr.apache.org/downloads.html).
2. Extract it to a stable folder, for example `C:\solr`.
3. Open Command Prompt:

```bat
cd C:\solr
bin\solr.cmd start
```

On some installs the command is `bin\solr start`. Use whichever script exists under `bin`.

4. Open `http://localhost:8983` in a browser. You should see the Solr Admin UI.
5. Stop Solr for the next step:

```bat
bin\solr.cmd stop
```

### 3. Run Solr as a Windows service (NSSM)

Solr does not install a Windows service by itself. [NSSM](https://nssm.cc/download) can run Solr in the background and start it on reboot.

1. Download and extract NSSM (for example to `C:\nssm`).
2. Open an **elevated** Command Prompt:

```bat
cd C:\nssm\win64
nssm install solr9
```

3. In the NSSM dialog:

| Field | Example |
|-------|---------|
| **Path** | `C:\solr\bin\solr.cmd` |
| **Startup directory** | `C:\solr\bin` |
| **Arguments** | `start -f -p 8983` |

4. On the **Details** tab, set a display name (for example `Apache Solr 9`) and install the service.
5. Start the service from **Services** (`services.msc`), or:

```bat
nssm start solr9
```

6. Confirm `http://localhost:8983` again.

---

## Install Solr on Linux

For a full NADA install on Linux, see [Installation (Linux)](./platform-linux).

Examples below use Debian/Ubuntu-style commands and `/opt/solr`. Adjust paths and package names for your distribution.

### 1. Install Java

```bash
sudo apt update
sudo apt install openjdk-17-jdk-headless
java -version
```

Use a JDK version supported by your Solr release.

### 2. Install Solr

```bash
cd /tmp
# Download the Solr 9.x tgz from https://solr.apache.org/downloads.html
tar xzf solr-9.*.tgz
sudo mkdir -p /opt/solr
sudo cp -a solr-9.*/* /opt/solr/
sudo useradd --system --home-dir /opt/solr --shell /usr/sbin/nologin solr || true
sudo chown -R solr:solr /opt/solr
```

Test start:

```bash
sudo -u solr /opt/solr/bin/solr start
```

Open `http://YOUR_SERVER:8983`. Then stop:

```bash
sudo -u solr /opt/solr/bin/solr stop
```

### 3. systemd unit (recommended)

Create `/etc/systemd/system/solr.service`:

```ini
[Unit]
Description=Apache Solr
After=network.target

[Service]
Type=forking
User=solr
Group=solr
Environment=SOLR_PID_DIR=/opt/solr
Environment=SOLR_HOME=/opt/solr/server/solr
WorkingDirectory=/opt/solr
ExecStart=/opt/solr/bin/solr start
ExecStop=/opt/solr/bin/solr stop
Restart=on-failure
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now solr
sudo systemctl status solr
```

Confirm `http://YOUR_SERVER:8983`. Restrict port **8983** with a firewall if the server is publicly reachable.

---

## Next: connect NADA and index

With Solr running, finish setup in the administrator guide:

**[Solr search](/admin-guide/web-ui/solr)** — `solr.php` connection, create core, schema, indexing, and enabling the search provider.

---

## Troubleshooting (install)

| Issue | What to check |
|-------|----------------|
| Solr Admin UI not reachable | Java installed; Solr started; port `8983`; firewall |
| Service fails on boot (Windows) | NSSM service path/arguments; `JAVA_HOME` for the service account |
| Service fails on boot (Linux) | `systemctl status solr`; user `solr` owns `/opt/solr`; `LimitNOFILE` |

For ping, schema, and indexing issues after connect, see [Solr search — troubleshooting](/admin-guide/web-ui/solr#troubleshooting).

---

## Related

- [Installation overview](./) · [Installation (Linux)](./platform-linux) · [Installation (Windows)](./platform-windows)
- [Solr search (admin)](/admin-guide/web-ui/solr)
- [Site configurations](/admin-guide/web-ui/site-configurations)
- [Apache Solr documentation](https://solr.apache.org/guide/)
