import React from "react";
import BlogHeader from "@/components/BlogHeader";
import KubernetesImg from "@/public/kubernetes.png";
import EmbedGist from '@/components/embed-gist-lazy';

export const metadata = {
  metadataBase: new URL('https://hilars.dev'),
  title: "How I setup my Kubernetes Cluster",
  description: "See how I setup my Kubernetes Cluster and how I use it to host my sideprojects.",
  author: "Lars",
  date: "2024-08-29",
  url: "https://hilars.dev/blog/how-i-setup-my-k3s-kubernetes-cluster",
  image: "/api/og?title=How+I+setup+my+Kubernetes+Cluster",
  tags: ["Kubernetes", "K3s", "K3s Kubernetes", "Kubernetes Cluster", "Kubernetes Setup", "Kubernetes Tutorial", "Kubernetes Guide"],
  openGraph: {
    type: "article",
    title: "How I setup my Kubernetes Cluster",
    description: "See how I setup my Kubernetes Cluster and how I use it to host my sideprojects.",
    url: "https://hilars.dev/blog/how-i-setup-my-k3s-kubernetes-cluster",
    images: [
      {
        url: "/api/og?title=How+I+setup+my+Kubernetes+Cluster",
        width: 1200,
        height: 630,
        alt: "How I setup my Kubernetes Cluster",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How I setup my Kubernetes Cluster",
    description: "See how I setup my Kubernetes Cluster and how I use it to host my sideprojects.",
    images: [
      {
        url: "/api/og?title=How+I+setup+my+Kubernetes+Cluster",
        width: 1200,
        height: 630,
        alt: "How I setup my Kubernetes Cluster",
      },
    ],
  },
};

const BlogPostHowISetupMyK3sKubernetesCluster: React.FC = () => {
  return (
    <div className="min-h-screen container my-20 lg:my-28">
      <BlogHeader
        title="How I setup my Kubernetes Cluster"
        subtitle="Learn how I setup my Kubernetes Cluster and how I use it to host my sideprojects."
        date="Aug 29 2024"
        image={KubernetesImg}
      // crossPostUrl="https://medium.com/@buildItN0w/how-to-create-custom-short-links-with-referrer-tracking-using-next-js-ffca6a1d1e79"
      // crossPostText="Medium"
      />

      <div className="prose lg:prose-xl text-sm md:text-base text-left mx-auto">
        <div>
          <p>I have several side projects that I continually work on and improve. Some of them are already launched, others are still in the building phase, and many more are in the planning stages <strong>😅</strong>. You can see the full list under <a href="/projects">Projects</a>.</p>

          <h2 className="text-xl">Status Quo</h2>
          <p>Until now, I’ve been using VPS servers, Cloudflare, and/or Vercel to host my projects. My usual process involves buying a new VPS, applying my Ansible base role—which installs everything including Nginx, Node Exporter, and a WireGuard VPN tunnel for management and monitoring—and then creating a specific role for whatever I want to deploy.</p>
          <p>This approach works great! I love Ansible and have invested a lot of time over the past 5-8 years optimizing my setup. I have roles for everything I need, and setting up a new server (whether on-prem or a cloud VPS) takes about 5 minutes. However, my Ansible setup is quite monolithic and is centered around a single repository where I manage my inventory, roles, and playbook (by the way, I only use one playbook and control execution with tags and limits, which I believe is the best approach). This makes it challenging to use in a per-project (repository) based CI/CD workflow.</p>

          <h2 className="text-xl">Finding Alternatives</h2>
          <p>So, I started thinking about alternatives that could fulfill the following needs:</p>
          <ul>
            <li>Easy HTTP(S) ingress with Nginx</li>
            <li>Multiple services per project</li>
            <li>Cron jobs</li>
            <li>Deployment from multiple projects/repositories to the same cluster/instance</li>
          </ul>
          <p>It became pretty obvious that Kubernetes was the right fit for me! But I still wanted to take advantage of the excellent VPS offers from <a href="http://netcup.de/?ref=45622">Netcup.de</a> and continue using my Ansible base setup (monitoring, WireGuard tunnel, etc.). Therefore, I decided to use k3s, a super lightweight Kubernetes distribution that I’m running on a <a href="https://www.netcup.de/vserver/vps.php?ref=45622">Netcup.de VPS</a> located in their US data center in Manassas.</p>
          <p>Currently, it’s just a single-node cluster, but I can expand it if needed.</p>

          <h2 className="text-xl">Setup</h2>
          <p>The setup was straightforward. After purchasing the VPS, I uploaded my Debian base image and ran my Ansible base role against it.</p>
          <p>I then added these two k3s configuration files:</p>

          <EmbedGist gistId="l4r-s/d44504d6305ad50345f6d3c08ab550be" file="config.yaml" />
          <EmbedGist gistId="l4r-s/d44504d6305ad50345f6d3c08ab550be" file="registries.yaml" />



          <p>These files do the following:</p>
          <ul>
            <li>Disable Traefik—I’m using the Nginx ingress controller instead.</li>
            <li>Disable ServiceLB—I’m using a NodePort service with <code>hostNetwork: true</code> for the Nginx ingress controller.</li>
            <li>Explicitly set the SQLite DB path.</li>
            <li>Add my private Docker registry so I can pull images from there.</li>
            <li>Set the node token to a randomly generated string.</li>
            <li>Enable the Flannel WireGuard network, which encrypts cluster traffic with WireGuard between k3s nodes. If I need to expand, I can just add a second VPS and have the traffic encrypted.</li>
          </ul>
          <p>After that, I simply ran <code>curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="server" K3S_CLUSTER_INIT=true sh -s -</code> and the cluster was installed!</p>

          <h2 className="text-xl">Common Services</h2>
          <p>All of my side projects require some common services, such as:</p>
          <ul>
            <li>Let’s Encrypt certificates</li>
            <li>HTTPS ingress</li>
            <li>PostgreSQL database</li>
            <li>CI/CD deployment</li>
            <li>Umami web analytics</li>
            <li>Backup</li>
          </ul>
          <p>These services need to be deployed to my k3s cluster, and I decided to use Helm together with Helmfiles for this.</p>

          <h3 className="text-lg">What is Helm?</h3>
          <p>Helm is a package manager for Kubernetes, the popular container orchestration platform. It simplifies the deployment, management, and scaling of Kubernetes applications by using "charts," which are pre-configured templates. These charts contain all the necessary information to deploy a Kubernetes application, including YAML files for resources, configuration values, and dependencies.</p>
          <p>This setup gives me the flexibility to use existing charts or create custom ones as needed.</p>

          <h3 className="text-lg">What is Helmfile?</h3>
          <p>Helmfile is a declarative specification for deploying Helm charts. While Helm alone is powerful, managing multiple Helm charts across different environments or clusters can become cumbersome. Helmfile addresses this by enabling the management of multiple Helm releases using a single file.</p>
          <p>I created the following Helmfiles:</p>
          <ul>
            <li><code>backup</code>: Backs up the k3s cluster to my Nextcloud instance using a custom chart with a Kubernetes CronJob.</li>
            <li><code>cert-manager</code>: Creates a ClusterIssuer with the DNS-01 challenge using Cloudflare DNS.</li>
            <li><code>github-deployment</code>: Manages service accounts for all CI/CD-related deployments. This uses a custom chart that creates the service account, role, and role bindings for a namespace.</li>
            <li><code>nginx-ingress</code>: Deploys the Nginx ingress controller to my cluster and makes it available through a NodePort (with <code>hostNetwork: true</code>) on ports 80/443 on my VPS.</li>
            <li><code>umami</code>: Uses two custom charts—one for deploying the Umami Next.js application and another for the PostgreSQL database. I chose to create my own PostgreSQL chart for simplicity and to add backups to my Nextcloud instance.</li>
          </ul>
          
          <h2 className="text-xl">What’s Next?</h2>
          <p>I am super happy with the setup and will start migrating all my side projects to my new cluster. This will enable me to have a thorough CI/CD setup with GitHub Actions.</p>
          <p>I plan to have preview deployments for pull requests as well as production deployments on the main branch. Stay tuned!</p>
        </div>

      </div>

    </div>
  );
};

export default BlogPostHowISetupMyK3sKubernetesCluster;
