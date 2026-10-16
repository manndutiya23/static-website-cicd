# static-website-cicd

A beginner-friendly DevOps mini-project that packages a plain HTML, CSS, and JavaScript landing page in Nginx, then verifies it automatically with GitHub Actions.

## Objective

Learn a practical CI/CD loop without a framework, package manager, cloud account, or paid service:

1. Create a static website.
2. Serve it with Nginx in a lightweight Docker container.
3. Build and test the container on every push to `main` and pull request targeting `main`.

## Architecture

```text
Browser -> Nginx (Docker, port 80) -> index.html, styles.css, script.js
                              |
                       /health -> HTTP 200

GitHub push/PR -> GitHub Actions -> file checks -> Docker build -> container tests
```

## Project files

- `index.html`, `styles.css`, `script.js`: the responsive website.
- `Dockerfile`: builds the `static-website-cicd` image from `nginx:alpine`.
- `nginx.conf`: serves static files on port 80 and exposes `/health`.
- `.github/workflows/ci-cd.yml`: builds and tests the image on GitHub-hosted Ubuntu.

## Prerequisites

- Git
- Docker Desktop (running)
- A GitHub account

No Node.js, package manager, framework, or build tool is required.

## Run locally

From the project directory:

```bash
docker build --tag static-website-cicd .
docker run --detach --publish 8080:80 --name static-website-cicd-local static-website-cicd
```

Open <http://localhost:8080> in a browser. Test the website and health endpoint:

```bash
curl --fail http://localhost:8080/
curl --fail http://localhost:8080/health
```

View the running container logs:

```bash
docker logs static-website-cicd-local
```

Stop and remove the local container when finished:

```bash
docker rm --force static-website-cicd-local
```

## Push to GitHub

Create an empty GitHub repository, then run these commands from this folder:

```bash
git init
git branch --move main
git add .
git commit -m "Build static website CI/CD project"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push --set-upstream origin main
```

Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` with your GitHub values. Do not add passwords, access tokens, or other secrets to this repository.

## Inspect GitHub Actions

After pushing, open the repository on GitHub and select the **Actions** tab. Choose **Static Website CI/CD** to see file verification, image build, container startup, endpoint tests, and cleanup logs. The workflow also runs automatically for pull requests targeting `main`.

## Test the website

- Browser: visit `http://localhost:8080`.
- Command line: run `curl --fail http://localhost:8080/` and `curl --fail http://localhost:8080/health`.
- CI: review the latest workflow run in the GitHub Actions tab.
