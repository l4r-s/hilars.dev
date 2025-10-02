import React from "react";

interface Props {
  title?: string;
  theme?: string;
}

const Home: React.FC<Props> = (props) => {
  return (
    <div>
      {/* <div className="relative hero min-h-screen bg-[url('/bg1.webp')] overflow-hidden bg-cover bg-center backdrop-blur-sm backdrop-filter flex justify-center">
        <div
          className="absolute inset-0 backdrop-filter backdrop-blur-lg"
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden border-white border-2 flex items-center justify-center w-96 h-96 md:w-120 md:h-120 lg:w-150 lg:h-150"
        >
          <div
            className={`bg-[url('/bg1.webp')] bg-center bg-cover w-full h-full flex items-center justify-center`}
          >
            <div className="relative">
              <h1
                className="text-white text-6xl md:text-7xl lg:text-9xl cursor-pointer"
              >
                <div className="text-white font-bold text-center flex flex-col items-center">
                  <div className="text-6xl md:text-7xl lg:text-9xl bg-white rounded-full p-8">
                    👋
                  </div>
                </div>
              </h1>
            </div>
          </div>
        </div>
      </div> */}
      <div className="container mx-auto px-4 lg:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-10 text-lg md:text-xl leading-relaxed">
            {/* Introduction */}
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
                👋 Hi, I'm Lars!
              </h1>
              <p className="text-center md:text-left">
                A <span className="font-semibold text-primary">Senior Engineer</span> working at the intersection of software, infrastructure, and reliability.
              </p>
            </div>
            
            {/* Day/Night narrative */}
            <p className="text-center md:text-left bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900 dark:to-transparent p-6 rounded-lg border-l-4 border-primary">
              By day, I design and build observability platforms with <span className="font-medium">Kubernetes</span>, <span className="font-medium">Ansible/Terraform</span>, and <span className="font-medium">Elastic</span>.
              By night, I work on my Side Projects like{" "}
              <a href="https://postcapture.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 font-medium transition-colors underline decoration-primary/30 hover:decoration-primary">PostCapture</a>,{" "}
              <a href="https://showupinai.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 font-medium transition-colors underline decoration-primary/30 hover:decoration-primary">ShowUpInAI</a>,{" "}
              and <a href="https://backlinkdog.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 font-medium transition-colors underline decoration-primary/30 hover:decoration-primary">BacklinkDog</a>,{" "}
              where I explore how to turn engineering into products people love.
            </p>
            
            {/* Current role achievements */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-center md:text-left">
                At my current role, I lead and deliver projects such as:
              </h2>
              <ul className="max-w-3xl mx-auto space-y-4 list-none bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8 rounded-xl border border-primary/20">
                <li className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                  <span className="text-xl flex-shrink-0">✨</span>
                  <span>Building a Kibana plugin and ingest scripting system to pseudonymize sensitive data at scale in Elasticsearch, with a flexible dot-notation API for nested fields.</span>
                </li>
                <li className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                  <span className="text-xl flex-shrink-0">🔧</span>
                  <span>Leading development of an Ansible Collection for Observability, including custom modules, automated testing, and a secure private Galaxy server for distributing the collection as a commercial product.</span>
                </li>
                <li className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                  <span className="text-xl flex-shrink-0">📊</span>
                  <span>Delivering and planning observability platforms for enterprise clients (Elastic, Kafka, Ansible).</span>
                </li>
                <li className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                  <span className="text-xl flex-shrink-0">🖥️</span>
                  <span>Designing and migrating a new Proxmox PVE production infrastructure, moving all workloads from Nutanix and saving the company <span className="font-semibold text-primary">200k+ CHF over 3 years</span>.</span>
                </li>
                <li className="flex items-start gap-3 hover:translate-x-1 transition-transform">
                  <span className="text-xl flex-shrink-0">🤝</span>
                  <span>Acting as a technical mentor and cross-team problem solver, supporting teams across the company with complex engineering challenges.</span>
                </li>
              </ul>
            </div>
            
            {/* Past decade experience */}
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-center md:text-left">
                Over the past decade I have:
              </h2>
              <ul className="max-w-3xl mx-auto space-y-3 list-none pl-0">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 flex-shrink-0">✨</span>
                  <span>Built production systems in <span className="font-medium">Python</span>, <span className="font-medium">TypeScript</span>, <span className="font-medium">Go</span>, and <span className="font-medium">React</span>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 flex-shrink-0">🔧</span>
                  <span>Automated infrastructure and operations with <span className="font-medium">Ansible</span>, <span className="font-medium">Terraform</span>, and <span className="font-medium">CI/CD pipelines</span>.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 flex-shrink-0">📊</span>
                  <span>Designed and operated resilient observability and infrastructure stacks (<span className="font-medium">Elastic/Kafka</span>, <span className="font-medium">Proxmox/KVM/VMware/Nutanix</span>, <span className="font-medium">Linux Engineering</span>).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1 flex-shrink-0">🖥️</span>
                  <span>Launched multiple indie SaaS projects to explore product building and scaling.</span>
                </li>
              </ul>
            </div>

            {/* Career goals */}
            {/* <div className="mt-8 p-6 md:p-8 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl border-l-4 border-primary">
              <p className="text-center md:text-left italic">
                I'm aiming for my next step as a <span className="font-semibold text-primary">Principal/Staff Engineer</span> or <span className="font-semibold text-primary">SRE</span>, where I can combine hands-on coding, architectural thinking, and a reliability mindset to help teams deliver faster, safer, and more scalable software.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
