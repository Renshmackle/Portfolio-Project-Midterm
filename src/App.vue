<template>
  <v-app :style="{ background: '#000000' }">
    <!-- Navigation -->
    <v-app-bar app :class="{'glass-effect': isScrolled}" :style="{ backgroundColor: isScrolled ? 'transparent' : '#000000' }" elevate-on-scroll class="px-4">
      <v-toolbar-title class="text-h4 font-weight-bold" :style="{ color: '#FFFFFF' }">RENZ</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <!-- Desktop Menu -->
      <div class="hidden-sm-and-down">
        <v-btn
          v-for="item in menuItems"
          :key="item.title"
          :href="item.href"
          text
          :color="activeSection === item.href.substring(1) ? '#ffbd39' : '#FFFFFF'"
          :class="['nav-btn', 'mx-2', 'text-subtitle-1', { 'active-section': activeSection === item.href.substring(1) }]"
          @click.prevent="scrollToSection(item.href.substring(1))"
        >
          {{ item.title }}
        </v-btn>
      </div>
      
      <!-- Mobile Menu Button -->
      <v-app-bar-nav-icon 
        @click.stop="drawer = !drawer" 
        class="hidden-md-and-up" 
        color="white"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
      :style="{ background: '#000000' }"
    >
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :href="item.href"
          @click="scrollToSection(item.href.substring(1))"
          link
        >
          <v-list-item-content>
            <v-list-item-title 
              :class="['menu-item', { 'yellow--text': activeSection === item.href.substring(1) }]"
            >
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <!-- Hero Section -->
      <section id="home" class="hero d-flex align-center">
        <v-container fluid>
          <v-row align="center" justify="space-between" no-gutters>
            <v-col cols="12" md="6" class="pa-6">
              <p class="text-h6 mb-2 yellow--text">HELLO!</p>
              <h1 class="text-h2 font-weight-bold mb-2" :style="{ color: '#FFFFFF' }">
                I'm <span class="yellow--text">Lawrence</span>
              </h1>
              <h1 class="text-h2 font-weight-bold mb-4 yellow--text">
                Sabrido
              </h1>
              <p class="text-h5 mb-8" :style="{ color: '#FFFFFF' }">A BSIT III Student</p>
              <v-btn
                color="#ffbd39"
                x-large
                class="mr-4"
                :style="{ color: '#000000' }"
              >
                HIRE ME
              </v-btn>
              <v-btn
                outlined
                x-large
                :style="{ borderColor: '#FFFFFF', color: '#FFFFFF' }"
              >
                MY WORKS
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" class="d-none d-md-flex justify-center align-center">
              <v-img
                src="../public/images/me.png"
                alt="Lawrence Sabrido"
                max-height="600"
                contain
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- About Section -->
      <section id="about" class="py-12" :style="{ background: '#000000' }">
        <v-container>
          <h2 class="text-h2 font-weight-bold mb-6 text-center" :style="{ color: '#FFFFFF' }">About Me</h2>
          <v-row align="center" justify="space-between">
            <v-col cols="12" md="5">
              <v-img
                src="../public/images/me.png"
                alt="Lawrence Sabrido"
                max-height="600"
                max-width="500"
                class="mx-auto rounded-lg"
              ></v-img>
            </v-col>
            <v-col cols="12" md="7">
              <p class="text-body-1 mb-6" :style="{ color: '#FFFFFF' }">
                I am a passionate web developer with a focus on creating sleek, responsive
                websites that provide seamless user experiences. With a background in front-
                end development, I specialize in HTML, CSS, JavaScript, and React,
                constantly seeking to enhance my skills and stay updated with the latest
                technologies.
              </p>
              <v-list dense :style="{ background: 'transparent' }">
                <v-list-item v-for="(value, key) in personalInfo" :key="key">
                  <v-list-item-content>
                    <v-list-item-title>
                      <span class="info-label" :style="{ color: '#ffbd39', width: '120px', display: 'inline-block' }">{{ key }}:</span>
                      <span :style="{ color: '#FFFFFF' }">{{ value }}</span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <div class="d-flex align-center mt-6">
                <span class="text-h6" :style="{ color: '#ffbd39' }">
                  <span ref="projectCounter">{{ displayedProjects }}</span> Project{{ displayedProjects !== 1 ? 's' : '' }} complete
                </span>
                <v-icon :color="'#ffbd39'" class="ml-2">mdi-briefcase-check</v-icon>
              </div>
              <v-btn
                :color="'#ffbd39'"
                x-large
                class="mt-6"
                :style="{ color: '#000000' }"
                @click="downloadCV"
              >
                DOWNLOAD CV
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Services Section -->
      <section id="services" class="py-12" :style="{ background: '#000000' }">
        <v-container>
          <h2 class="text-h2 font-weight-bold mb-6 text-center" :style="{ color: '#FFFFFF' }">Services</h2>
          <p class="text-body-1 mb-8 text-center" :style="{ color: '#FFFFFF' }">
            My services are centered on creating engaging, functional, and user-friendly websites that cater to modern standards and expectations.
          </p>
          <v-row>
            <v-col v-for="service in services" :key="service.title" cols="12" sm="6" md="4">
              <v-hover v-slot="{ hover }">
                <v-card
                  class="pa-4 text-center"
                  :elevation="hover ? 8 : 2"
                  :class="{ 'on-hover': hover }"
                  :style="{ 
                    background: service.title === 'UI/UX Design' ? '#ffbd39' : '#1E1E1E',
                    color: service.title === 'UI/UX Design' ? '#000000' : '#FFFFFF'
                  }"
                >
                  <v-icon size="48" :color="service.title === 'UI/UX Design' ? '#000000' : '#ffbd39'" class="mb-4">{{ service.icon }}</v-icon>
                  <h3 class="text-h5 font-weight-bold mb-2">{{ service.title }}</h3>
                  <p>{{ service.description }}</p>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Projects Section -->
      <section id="projects" class="py-12">
        <v-container>
          <h2 class="text-h2 font-weight-bold mb-6 text-center" :style="{ color: '#FFFFFF' }">Projects</h2>
          <v-row>
            <v-col v-for="project in projects" :key="project.title" cols="12" md="4">
              <v-hover v-slot="{ hover }">
                <v-card class="mx-auto" max-width="400" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" :style="{ background: '#1E1E1E', color: '#FFFFFF' }">
                  <v-img :src="project.image" height="250px" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                    <v-card-title class="text-h5">{{ project.title }}</v-card-title>
                  </v-img>
                  <v-card-text>
                    <div>{{ project.description }}</div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn :color="'#ffbd39'" text :href="project.link" target="_blank" :style="{ color: '#000000' }">
                      <v-icon left>mdi-open-in-new</v-icon>
                      View Project
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="project.show = !project.show">
                      <v-icon :color="'#ffbd39'">{{ project.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-expand-transition>
                    <div v-show="project.show">
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-icon :color="'#ffbd39'" small left>mdi-information</v-icon>
                        {{ project.details }}
                      </v-card-text>
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Skills Section -->
      <section id="skills" class="py-12" :style="{ background: '#000000' }">
        <v-container>
          <h2 class="text-h2 font-weight-bold mb-6 text-center" :style="{ color: '#FFFFFF' }">My Skills</h2>
          <p class="text-body-1 mb-8 text-center" :style="{ color: '#FFFFFF', maxWidth: '800px', margin: '0 auto' }">
            I have a diverse set of web development and programming skills that enable me to build functional, dynamic websites and applications.
          </p>
          <v-row>
            <v-col v-for="skill in skills" :key="skill.name" cols="12" sm="6">
              <div class="d-flex align-center mb-2">
                <v-icon :color="'#ffbd39'" class="mr-2">{{ skill.icon }}</v-icon>
                <span class="text-h6" :style="{ color: '#FFFFFF' }">{{ skill.name }}</span>
                <span class="ml-auto" :style="{ color: '#ffbd39' }">{{ skill.level }}%</span>
              </div>
              <div class="progress-bar-container">
                <div 
                  class="progress-bar" 
                  :style="{ width: `${skill.level}%` }"
                  :aria-valuenow="skill.level"
                  :aria-valuemin="0"
                  :aria-valuemax="100"
                  role="progressbar"
                ></div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="py-12 contact-section">
        <v-container fluid class="pa-0">
          <v-img
            src="../public/images/bg_2.jpg"
            height="100vh"
            width="100%"
            class="contact-image"
          >
            <v-row class="fill-height" align="center" justify="center">
              <v-col cols="12" md="8" class="text-center">
                <h2 class="text-h2 font-weight-bold mb-6 full-white-text">
                  I'm <span class="highlight-text">Available</span> for Freelancing
                </h2>
                <p class="text-h5 mb-8 full-white-text">If you're looking for a dedicated and experienced developer to bring your ideas to life, let's connect!</p>
                <v-btn
                  color="#ffbd39"
                  x-large
                  class="black-text"
                  @click="dialog = true"
                >
                  Hire Me
                </v-btn>
              </v-col>
            </v-row>
          </v-img>
        </v-container>
      </section>

      <!-- Hire Me Dialog -->
      <v-dialog
        v-model="dialog"
        max-width="400"
      >
        <v-card>
          <v-card-title class="headline">Contact Me</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(item, index) in contactInfo" :key="index" :href="item.link" target="_blank">
                <v-list-item-icon>
                  <v-icon :color="item.color">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              Close
            
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>

    <v-footer :style="{ background: '#000000' }" class="py-4">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <h3 class="text-h6 font-weight-bold  mb-4" :style="{ color: '#FFFFFF' }">About</h3>
            <p :style="{ color: '#FFFFFF' }">Whether you have a project in mind or just want to chat about tech, I'm here to help! Feel free to reach out if you have any questions or if you're interested in collaborating.</p>
          </v-col>
          <v-col cols="12" md="3">
            <h3 class="text-h6 font-weight-bold mb-4" :style="{ color: '#FFFFFF' }">Links</h3>
            <v-list dense :style="{ background: 'transparent' }">
              <v-list-item v-for="item in menuItems" :key="item.title" :href="item.href" link>
                <v-list-item-content>
                  <v-list-item-title :style="{ color: '#FFFFFF' }">{{ item.title  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="3">
            <h3 class="text-h6 font-weight-bold mb-4" :style="{ color: '#FFFFFF' }">Services</h3>
            <v-list dense :style="{ background: 'transparent' }">
              <v-list-item v-for="service in services" :key="service.title">
                <v-list-item-content>
                  <v-list-item-title :style="{ color: '#FFFFFF' }">{{ service.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="3">
            <h3 class="text-h6 font-weight-bold mb-4" :style="{ color: '#FFFFFF' }">Have Questions?</h3>
            <p :style="{ color: '#FFFFFF' }">203 Taglatawan St, Bayugan City, Agusan Del Sur, PH</p>
            <p :style="{ color: '#FFFFFF' }">+2 392 3929 210</p>
            <p :style="{ color: '#FFFFFF' }">info@yourdomain.com</p>
          </v-col>
        </v-row>
        <v-divider class="my-4" :style="{ background: '#FFFFFF' }"></v-divider>
        <v-row align="center" justify="space-between">
          <v-col cols="12" md="6" class="text-center text-md-left">
            <span :style="{ color: '#FFFFFF' }">© {{ new Date().getFullYear() }} All rights reserved.</span>
          </v-col>
          <v-col cols="12" md="6" class="text-center text-md-right">
            <v-btn v-for="icon in socialIcons" :key="icon.name" :href="icon.link" target="_blank" icon class="mx-2">
              <v-icon :color="'#ffbd39'">{{ icon.icon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

export default {
  name: 'App',
  setup() {
    const menuItems = [
      { title: 'Home', href: '#home' },
      { title: 'About', href: '#about' },
      { title: 'Services', href: '#services' }, 
      { title: 'Projects', href: '#projects' },
      { title: 'Skills', href: '#skills' },
      { title: 'Contact', href: '#contact' },
    ]

    const drawer = ref(false)
    const activeSection = ref('home')
    const dialog = ref(false)
    const isScrolled = ref(false)

    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        const navbarHeight = document.querySelector('.v-app-bar').offsetHeight
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - navbarHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
      drawer.value = false
      activeSection.value = sectionId
    }

    const handleScroll = () => {
      const sections = menuItems.map(item => item.href.substring(1))
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 50 && rect.bottom > 50
        }
        return false
      })
      if (currentSection) {
        activeSection.value = currentSection
      }
      isScrolled.value = window.scrollY > 50
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      handleScroll() // Initial check
    })

    const projects = reactive([
      {
        title: 'Text-Based Game',
        description: ' A digital platform that offers engaging text-based adventures where users can make choices that influence the storyline.',
        details: 'Features include product catalog, shopping cart, user authentication, and payment integration.',
        image: '/images/project-1.png',
        link: 'https://example.com/ecommerce',
        show: false,
      },
      {
        title: 'Calculator',
        description: 'An online calculator designed to perform a wide range of mathematical operations quickly and accurately.',
        details: 'Built with Vue.js and Vuex for state management. Includes features like task categorization, due dates, and progress tracking.',
        image: '/images/project-4.png',
        link: 'https://example.com/task-manager',
        show: false,
      },
      {
        title: 'Attendance Management System',
        description: 'A comprehensive system for tracking and managing attendance in educational or organizational settings.',
        details: 'Utilizes a weather API to provide current conditions and forecasts. Built with Vue.js and Chart.js for data visualization.',
        image: '/images/project-5.png',
        link: 'https://example.com/weather-app',
        show: false,
      },
    ])
    
    const skills = reactive([
      { name: 'HTML', icon: 'mdi-language-html5', level: 0 },
      { name: 'CSS', icon: 'mdi-language-css3', level: 0 },
      { name: 'BOOTSTRAP', icon: 'mdi-bootstrap', level: 0 },
      { name: 'LARAVEL', icon: 'mdi-laravel', level: 0 },
      { name: 'SQL', icon: 'mdi-database', level: 0 },
      { name: 'JAVA', icon: 'mdi-language-java', level: 0 },
    ])

    const finalSkillLevels = [
      { name: 'HTML', level: 80 },
      { name: 'CSS', level: 85 },
      { name: 'BOOTSTRAP', level: 75 },
      { name: 'LARAVEL', level: 70 },
      { name: 'SQL', level: 75 },
      { name: 'JAVA', level: 80 },
    ]

    onMounted(() => {
      setTimeout(() => {
        skills.forEach((skill, index) => {
          const targetLevel = finalSkillLevels[index].level
          const duration = 1500 // Animation duration in milliseconds
          const steps = 60 // Number of steps in the animation
          const increment = targetLevel / steps
          let currentStep = 0

          const intervalId = setInterval(() => {
            if (currentStep < steps) {
              skill.level = Math.min(Math.round(increment * (currentStep + 1)), targetLevel)
              currentStep++
            } else {
              clearInterval(intervalId)
            }
          }, duration / steps)
        })
      }, 500) // Delay the start of the animation by 500ms
    })

    const contactInfo = [
      { title: 'Facebook', icon: 'mdi-facebook', color: '#1877F2', link: 'https://www.facebook.com/yourusername' },
      { title: 'GitHub', icon: 'mdi-github', color: '#333', link: 'https://github.com/yourusername' },
      { title: 'LinkedIn', icon: 'mdi-linkedin', color: '#0A66C2', link: 'https://www.linkedin.com/in/yourusername' },
      { title: 'Instagram', icon: 'mdi-instagram', color: '#E4405F', link: 'https://www.instagram.com/yourusername' },
    ] 

    const socialIcons = [
      { name: 'GitHub', icon: 'mdi-github', link: 'https://github.com' },
      { name: 'LinkedIn', icon: 'mdi-linkedin', link: 'https://linkedin.com' },
      { name: 'Twitter', icon: 'mdi-twitter', link: 'https://twitter.com' },
    ]

    const personalInfo = {
      'Name':  'Lawrence Sabrido',
      'Date of birth': 'October 15, 2003',
      'Address': 'Barangay Taglatawan, Bayugan City, PH',
      'Zip code': '8502',
      'Email': 'renzsabrido1@gmail.com',
      'Phone': '+639 7589',
    }

    const projectsCompleted = 3
    const displayedProjects = ref(0)

    const downloadCV = () => {
      // Implement CV download functionality here
      console.log('Downloading CV...')
    }

    onMounted(() => {
      const duration = 2000 // Animation duration in milliseconds
      const steps = 30 // Number of steps in the animation
      const stepDuration = duration / steps

      const animate = () => {
        let currentStep = 0
        const intervalId = setInterval(() => {
          if (currentStep < steps) {
            displayedProjects.value = Math.floor(Math.random() * 10)
            currentStep++
          } else {
            clearInterval(intervalId)
            displayedProjects.value = projectsCompleted
          }
        }, stepDuration)
      }

      animate()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    const services = [
      { title: 'Web Design', icon: 'mdi-palette', description: 'Creating visually appealing and user-friendly website designs.' },
      { title: 'UI/UX Design', icon: 'mdi-pencil-ruler', description: 'Designing intuitive user interfaces and seamless user experiences.' },
      { title: 'Web Development', icon: 'mdi-code-tags', description: 'Building responsive and dynamic websites using modern technologies.' },
      { title: 'App Development', icon: 'mdi-cellphone', description: 'Developing mobile applications for iOS and Android platforms.' },
      { title: 'Website Maintenance', icon: 'mdi-cog', description: 'Providing ongoing support and updates for existing websites.' },
      { title: 'Consulting Services', icon: 'mdi-account-group', description: 'Offering expert advice on web technologies and best practices.' },
    ]

    return {
      menuItems,
      activeSection,
      scrollToSection,
      drawer,
      projects,
      skills,
      dialog,
      contactInfo,
      socialIcons,
      personalInfo,
      projectsCompleted,
      displayedProjects,
      services,
      downloadCV,
      isScrolled
    }
  },
}
</script>

<style>
body {
  font-family: 'Bowlby One', sans-serif !important;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Bowlby One', sans-serif !important;
}

p {
  font-family: Arial, sans-serif;
}

.v-app-bar {
  transition: background-color 0.3s ease;
}

.glass-effect {
  background-color: rgba(0, 0, 0, 0.7) !important;
  backdrop-filter: blur(10px);
}

.nav-btn {
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease;
}

.nav-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #FFFFFF;
  transition: all 0.3s ease;
}

.nav-btn.active-section::after {
  width: 100%;
  left: 0;
}

.nav-btn.active-section {
  color: #ffbd39 !important;
}

.nav-btn:hover::after {
  width: 100%;
  left: 0;
}

.nav-btn:hover {
  color: #ffbd39 !important;
}

.hero {
  background: #000000;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

@media (max-width: 960px) {
  .hero {
    background-image: url('../public/images/me.png');
    background-size: cover;
    background-position: center;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .hero .v-container {
    position: relative;
    z-index: 1;
  }
}

.yellow--text {
  color: #ffbd39 !important;
}

.v-list-item__title {
  color: white !important;
  font-size: 1.1rem !important;
  padding: 12px 0;
}

.menu-item {
  display: inline-block;
  padding-bottom: 5px;
}

.v-navigation-drawer {
  padding-top: 60px;
}

.v-list-item {
  margin-bottom: 10px;
}

.hero {
  background: #000000;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.v-card.on-hover {
  transition: all 0.3s ease-in-out;
}

.v-card {
  transition: all 0.3s ease-in-out;
}

.v-card:hover {
  transform: translateY(-5px);
}

.v-btn {
  text-transform: none;
}

.progress-bar-container {
  background-color: #333333;
  border-radius: 5px;
  height: 10px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #ffbd39;
  transition: width 1.5s ease-out;
}

.contact-section {
  position: relative;
}

.contact-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.full-white-text {
  color: #FFFFFF !important;
}

.highlight-text {
  color: #ffbd39 !important;
}

.black-text {
  color: #000000 !important;
}

.contact-image {
  position: relative;
}

.contact-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3); 
  z-index: 1;
}

.contact-image .v-image__image {
  filter: none; 
}

.contact-image .v-responsive__content {
  position: relative;
  z-index: 2;
}
</style>