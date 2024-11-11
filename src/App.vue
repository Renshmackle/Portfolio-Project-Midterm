<template>
  <v-app :style="{ background: '#000000' }">
    <!-- Navigation -->
    <v-app-bar
      app
      :class="{ 'glass-effect': isScrolled }"
      :style="{ backgroundColor: isScrolled ? 'transparent' : '#000000' }"
      elevate-on-scroll
      class="px-4"
    >
      <v-toolbar-title class="text-h4">
        LAWRENCE SABRIDO
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Desktop Menu -->
      <div class="hidden-sm-and-down">
        <v-btn
          v-for="item in menuItems"
          :key="item.title"
          :href="item.href"
          text
          :color="
            activeSection === item.href.substring(1) ? '#ffbd39' : '#FFFFFF'
          "
          :class="[
            'nav-btn',
            'mx-2',
            'text-subtitle-1',
            { 'active-section': activeSection === item.href.substring(1) },
          ]"
          @click.prevent="scrollToSection(item.href.substring(1))"
        >
          {{ item.title }}
        </v-btn>
      </div>

      <!-- Mobile Menu Toggle Button -->
      <v-btn @click="isMenuOpen = true" icon class="hidden-md-and-up">
        <v-icon color="#ffbd39">mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Mobile Menu Overlay -->
    <v-overlay
      v-model="isMenuOpen"
      class="mobile-menu-overlay"
      :opacity="0.8"
      :scrim="false"
    >
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" class="text-center">
            <v-btn icon @click="isMenuOpen = false" class="close-btn mb-4" style="position: absolute; top: 8px; right: 8px; background: none; border: none;">
              <v-icon large color="#ffbd39">mdi-close</v-icon>
            </v-btn>
            <v-list nav class="mobile-menu-list">
              <v-list-item
                v-for="item in menuItems"
                :key="item.title"
                @click="scrollToSection(item.href.substring(1))"
                link
                class="mobile-menu-item"
              >
               <template v-slot:prepend>
                <v-icon color="#ffbd39">mdi-chevron-right</v-icon>
              </template>

                <v-list-item-content>
                  <v-list-item-title
                    class="text-h5 mb-2 mobile-menu-item"
                    :class="{
                      'yellow--text': activeSection === item.href.substring(1),
                    }"
                    :style="{
                      color:
                        activeSection !== item.href.substring(1)
                          ? '#FFFFFF'
                          : '',
                    }"
                  >
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item-content>

                <template v-slot:append>
                  <v-icon color="#ffbd39">mdi-chevron-left</v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>

    <v-main>
      <!-- Hero Section -->
      <section id="home" class="hero d-flex align-center">
        <v-container fluid>
          <v-row align="center" justify="space-between" no-gutters>
            <v-col cols="12" md="6" class="pa-6 text-center">
              <transition name="fade-slide" mode="out-in">
                <div :key="currentPage">
                  <p class="text-h6 mb-2 yellow--text">
                    {{ pages[currentPage].subtitle }}
                  </p>
                  <h1
                    class="text-h2 font-weight-bold mb-2"
                    v-if="pages[currentPage].isHtml"
                    v-html="pages[currentPage].title"
                  ></h1>
                  <h1
                    class="text-h2 mb-2"
                    v-else
                    :style="{ color: '#FFFFFF', fontWeight: '800' }"
                  >
                    {{ pages[currentPage].title }}
                  </h1>
                  <p
                    class="text-h6 mb-8"
                    :style="{ color: '#FFFFFF', fontWeight: '400' }"
                  >
                    {{ pages[currentPage].description }}
                  </p>
                  <v-btn
                    color="#ffbd39"
                    x-large
                    class="mr-4"
                    :style="{ color: '#000000' }"
                    @click="handleCtaClick"
                  >
                    {{ pages[currentPage].cta }}
                  </v-btn>
                  <v-btn
                    outlined
                    x-large
                    :style="{ borderColor: '#FFFFFF', color: '#000000' }"
                    @click="scrollToSection('projects')"
                  >
                    MY WORKS
                  </v-btn>
                </div>
              </transition>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="d-none d-md-flex justify-center align-center"
            >
              <transition name="fade-slide" mode="out-in">
                <v-img
                  :key="currentPage"
                  :src="pages[currentPage].image"
                  alt="Lawrence Sabrido"
                  max-height="600"
                  contain
                ></v-img>
              </transition>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- About Section -->
      <section id="about" class="py-12" :style="{ background: '#000000' }">
        <v-container>
          <h2
            class="text-h2 font-weight-bold mb-6 text-center"
            :style="{ color: '#FFFFFF' }"
          >
            About Me
          </h2>
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
              <p
                class="text-body-1 mb-6"
                :style="{ color: '#938d8c', fontWeight: '400' }"
              >
                I am a passionate web developer with a focus on creating sleek,
                responsive websites that provide seamless user experiences. With
                a background in front- end development, I specialize in HTML,
                CSS, JavaScript, and React, constantly seeking to enhance my
                skills and stay updated with the latest technologies.
              </p>
              <v-list dense :style="{ background: 'transparent' }">
                <v-list-item v-for="(value, key) in personalInfo" :key="key">
                  <v-list-item-content>
                    <v-list-item-title>
                      <span
                        class="info-label"
                        :style="{
                          color: '#FFFFFF',
                          width: '120px',
                          display: 'inline-block',
                          fontWeight: '600',
                        }"
                        >{{ key }}:</span
                      >
                      <span :style="{ color: '#938d8c', fontWeight: '400' }">{{
                        value
                      }}</span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <div class="d-flex align-center mt-6">
                <span class="text-h6" :style="{ color: '#ffbd39' }">
                  <span ref="projectCounter">{{ displayedProjects }}</span>
                  Project{{ displayedProjects !== 1 ? "s" : "" }} complete
                </span>
                <v-icon :color="'#ffbd39'" class="ml-2"
                  >mdi-briefcase-check</v-icon
                >
              </div>
              <v-btn
                :color="'#ffbd39'"
                x-large
                class="mt-6"
                :style="{ color: '#000000' }"
                @click="downloadCV"
              >
                DOWNLOAD RESUME
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Services Section -->
      <section id="services" class="py-12" :style="{ background: '#000000' }">
        <v-container>
          <h2
            class="text-h2 font-weight-bold mb-6 text-center"
            :style="{ color: '#FFFFFF' }"
          >
            Services
          </h2>
          <p
            class="text-body-1 mb-8 text-center"
            :style="{ color: '#938d8c', fontWeight: '400' }"
          >
            My services are centered on creating engaging, functional, and
            user-friendly websites that cater to modern standards and
            expectations.
          </p>
          <v-row>
            <v-col
              v-for="service in services"
              :key="service.title"
              cols="12"
              sm="6"
              md="4"
            >
              <v-hover v-slot="{ hover }">
                <v-card
                  class="pa-4 text-center"
                  :elevation="hover ? 8 : 2"
                  :class="{ 'on-hover': hover }"
                  :style="{ background: '#1E1E1E', color: '#FFFFFF' }"
                >
                  <v-icon size="48" color="#ffbd39" class="mb-4">{{
                    service.icon
                  }}</v-icon>
                  <h3 class="text-h5 font-weight-bold mb-2">
                    {{ service.title }}
                  </h3>
                  <p :style="{ color: '#938d8c', fontWeight: '400' }">
                    {{ service.description }}
                  </p>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Projects Section -->
      <section id="projects" class="py-12">
        <v-container>
          <h2
            class="text-h2 font-weight-bold mb-6 text-center"
            :style="{ color: '#FFFFFF' }"
          >
            Projects
          </h2>
          <p
            class="text-body-1 mb-8 text-center"
            :style="{ color: '#938d8c', fontWeight: '400' }"
          >
            Our team has successfully delivered a variety of projects that
            demonstrate our collective expertise in web development, software
            engineering, and user-centric design.
          </p>
          <v-row>
            <v-col
              v-for="project in projects"
              :key="project.title"
              cols="12"
              md="4"
            >
              <v-hover v-slot="{ hover }">
                <v-card
                  class="mx-auto"
                  max-width="400"
                  :elevation="hover ? 12 : 2"
                  :class="{ 'on-hover': hover }"
                  :style="{ background: '#1E1E1E', color: '#FFFFFF' }"
                >
                  <v-img
                    :src="project.image"
                    height="250px"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  >
                    <v-card-title class="text-h5">{{
                      project.title
                    }}</v-card-title>
                  </v-img>
                  <v-card-text>
                    <div>{{ project.description }}</div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      :color="'#ffbd39'"
                      text
                      :href="project.link"
                      target="_blank"
                      :style="{ color: '#ffbd39' }"
                    >
                      <v-icon left>mdi-open-in-new</v-icon>
                      View Project
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="project.show = !project.show">
                      <v-icon :color="'#ffbd39'">{{
                        project.show ? "mdi-chevron-up" : "mdi-chevron-down"
                      }}</v-icon>
                    </v-btn>
                  </v-card-actions>
                  <v-expand-transition>
                    <div v-show="project.show">
                      <v-divider></v-divider>
                      <v-card-text :style="{ textAlign: 'justify' }">
                        <v-icon :color="'#ffbd39'" small left
                          >mdi-information</v-icon
                        >
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
          <h2
            class="text-h2 font-weight-bold mb-6 text-center"
            :style="{ color: '#FFFFFF' }"
          >
            Skills
          </h2>
          <p
            class="text-body-1 mb-8 text-center"
            :style="{ color: '#938d8c', fontWeight: '400' }"
          >
            I have a diverse set of web development and programming skills that
            enable me to build functional, dynamic websites and applications.
          </p>
          <v-row>
            <v-col v-for="skill in skills" :key="skill.name" cols="12" sm="6">
              <div class="d-flex align-center mb-2">
                <v-icon :color="'#ffbd39'" class="mr-2">{{
                  skill.icon
                }}</v-icon>
                <span class="text-h6" :style="{ color: '#FFFFFF' }">{{
                  skill.name
                }}</span>
                <span class="ml-auto" :style="{ color: '#ffbd39' }"
                  >{{ skill.level }}%</span
                >
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
            src="/images/bg_2.jpg"
            height="100vh"
            width="100%"
            class="contact-image"
          >
            <v-row class="fill-height" align="center" justify="center">
              <v-col cols="12" md="8" class="text-center">
                <h2
                  class="text-h2 font-weight-bold mb-6 full-white-text"
                  :style="{ color: '#FFFFFF' }"
                >
                  I'm
                  <span class="highlight-text" :style="{ color: '#ffbd39' }"
                    >Available</span
                  >
                  for Freelancing
                </h2>
                <p
                  class="text-h5 mb-8 full-white-text"
                  :style="{ color: '#FFFFFF' }"
                >
                  If you're looking for a dedicated and experienced developer to
                  bring your ideas to life, let's connect!
                </p>
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
        transition="dialog-bottom-transition"
      >
        <v-card class="hire-me-dialog">
          <v-card-title class="headline text-center pa-6 position-relative">
            <span class="elegant-title" :style="{ color: '#ffbd39' }"
              >Let's Connect</span
            >
            <v-btn
              icon
              @click="dialog = false"
              class="close-btn"
              style="position: absolute; top: 8px; right: 8px; background: none; border: none;"
            >
              <v-icon large color="#ffbd39">mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="pt-6">
            <v-row justify="center">
              <v-col cols="12">
                <div class="text-center mb-6">
                  <p class="subtitle-1">
                    I'm excited to discuss how we can work together on your next
                    project!
                  </p>
                </div>
                <v-row class="contact-list">
                  <v-col
                    v-for="(item, index) in contactInfo"
                    :key="index"
                    cols="6"
                    class="text-center"
                  >
                    <v-btn
                      :href="item.link"
                      target="_blank"
                      icon
                      x-large
                      :color="item.color"
                      class="mb-2"
                    >
                      <v-icon large>{{ item.icon }}</v-icon>
                    </v-btn>
                    <div class="caption">{{ item.title }}</div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-main>

    <v-footer :style="{ background: '#000000' }" class="py-4">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <h3
              class="text-h6 font-weight-bold mb-4"
              :style="{ color: '#FFFFFF' }"
            >
              About
            </h3>
            <p :style="{ color: '#938d8c', fontWeight: '400' }">
              Whether you have a project in mind or just want to chat about
              tech, I'm here to help! Feel free to reach out if you have any
              questions or if you're interested in collaborating.
            </p>
          </v-col>
          <v-col cols="12" md="3">
            <h3
              class="text-h6 font-weight-bold mb-4"
              :style="{ color: '#FFFFFF' }"
            >
              Links
            </h3>
            <v-list dense :style="{ background: 'transparent' }">
              <v-list-item
                v-for="item in menuItems"
                :key="item.title"
                :href="item.href"
                link
              >
                <v-list-item-content>
                  <v-list-item-title
                    :style="{ color: '#938d8c', fontWeight: '400' }"
                    >{{ item.title }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="3">
            <h3
              class="text-h6 font-weight-bold mb-4"
              :style="{ color: '#FFFFFF' }"
            >
              Services
            </h3>
            <v-list dense :style="{ background: 'transparent' }">
              <v-list-item v-for="service in services" :key="service.title">
                <v-list-item-content>
                  <v-list-item-title
                    :style="{ color: '#938d8c', fontWeight: '400' }"
                    >{{ service.title }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="3">
            <h3
              class="text-h6 font-weight-bold mb-4"
              :style="{ color: '#FFFFFF' }"
            >
              Have Questions?
            </h3>
            <p :style="{ color: '#938d8c', fontWeight: '400' }">
              203 Taglatawan St, Bayugan City, Agusan Del Sur, PH
            </p>
            <p :style="{ color: '#938d8c', fontWeight: '400' }">
              +2 392 3929 210
            </p>
            <p :style="{ color: '#938d8c', fontWeight: '400' }">
              renzsabrido1@gmail.com
            </p>
          </v-col>
        </v-row>
        <v-divider class="my-4" :style="{ background: '#FFFFFF' }"></v-divider>
        <v-row align="center" justify="space-between">
          <v-col cols="12" md="6" class="text-center text-md-left">
            <span :style="{ color: '#FFFFFF' }"
              >© {{ new Date().getFullYear() }} All rights reserved.</span
            >
          </v-col>
          <v-col cols="12" md="6" class="text-center text-md-right">
            <v-btn
              v-for="icon in socialIcons"
              :key="icon.name"
              :href="icon.link"
              target="_blank"
              icon
              class="mx-2"
            >
              <v-icon :color="'#ffbd39'">{{ icon.icon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from "vue";

export default {
  name: "App",
  setup() {
    const menuItems = [
      { title: "Home", href: "#home" },
      { title: "About", href: "#about" },
      { title: "Services", href: "#services" },
      { title: "Projects", href: "#projects" },
      { title: "Skills", href: "#skills" },
      { title: "Contact", href: "#contact" },
    ];

    const handleCtaClick = () => {
      if (currentPage.value === 0) {
        scrollToSection("contact");
      } else {
        scrollToSection("contact");
      }
    };

    const isMenuOpen = ref(false);
    const activeSection = ref("home");
    const dialog = ref(false);
    const isScrolled = ref(false);

    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        isMenuOpen.value = false;
        setTimeout(() => {
          const navbarHeight =
            document.querySelector(".v-app-bar").offsetHeight;
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // Set the active section immediately after scrolling
          activeSection.value = sectionId;
        }, 300);
      }
    };

    const handleScroll = () => {
      const sections = menuItems.map((item) => item.href.substring(1));
      let currentSection = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) {
            currentSection = section;
            break;
          }
        }
      }

      if (currentSection) {
        activeSection.value = currentSection;
      }
      isScrolled.value = window.scrollY > 50;
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
    });

    const currentPage = ref(0);
    const pages = [
      {
        title: `<span style="color: white;">I'm</span> <span style="color: #ffbd39;">Lawrence <br> Aves Sabrido</span>`,
        subtitle: "H E L L O !",
        description: "A Junior Web Developer",
        cta: "HIRE ME",
        image: "/images/me.png",
        isHtml: true,
      },
      {
        title: "Let's Work Together",
        subtitle: "BUILDING THE FUTURE",
        description: "I'm passionate about web development and technology.",
        cta: "CONTACT ME",
        image: "/images/boy.png",
        isHtml: false,
      },
    ];

    // Automatically toggle pages every 5 seconds
    onMounted(() => {
      setInterval(() => {
        currentPage.value = currentPage.value === 0 ? 1 : 0;
      }, 5000);
    });

    const projects = reactive([
      {
        title: "Text-Based Game",
        description:
          "A digital platform that offers engaging text-based adventures where users can make choices that influence the storyline.",
        details:
          "Built with JavaScript for game logic, allowing players to navigate through different story paths based on their choices. Features include dynamic responses and AI-powered story progression.",
        image: "/images/project-1.png",
        link: "https://github.com/Caeilanlightwood77/text-based-game",
        show: false,
      },
      {
        title: "Calculator",
        description:
          "A Calculator application that performs basic arithmetic operations with a user-friendly interface and basic UI design.",
        details:
          "Built using HTML, CSS, and JavaScript. Features basic arithmetic functions and error handling for user-friendly calculations.",
        image: "/images/project-4.png",
        link: "https://github.com/Caeilanlightwood77/simple_calculator",
        show: false,
      },
      {
        title: "Attendance Management System",
        description:
          "An Attendance Management System that helps track and manage attendance records for students or employees.",
        details:
          "Developed with Laravel and SQL for backend functionality. Allows users to track attendance, view logs, and generate reports with data visualization.",
        image: "/images/project-5.png",
        link: "https://example.com/attendance-system",
        show: false,
      },
      {
        title: "To Do List",
        description:
          "A user-friendly To-Do List app that helps individuals efficiently organize, manage, and track their tasks with ease.",
        details:
          "Built with Vue.js for a responsive and dynamic user interface, this app allows users to create, edit, and prioritize tasks. It supports tracking task progress and includes a simple, intuitive design for easy task management.",
        image: "/images/ToDo.png",
        link: "https://vue-to-do-list-activity.vercel.app/",
        show: false,
      },
      {
        title: "Weather App",
        description:
          "A simple, user-friendly weather app that allows users to check current weather conditions and forecasts for any location.",
        details:
          "Built with Vue.js, this app provides real-time weather information including temperature, humidity, etc. It features an intuitive interface for easy navigation and offers detailed weather data for locations worldwide.",
        image: "/images/Weather.png",
        link: "https://simple-weather-app-six-henna.vercel.app/",
        show: false,
      },
    ]);

    const skills = reactive([
      { name: "HTML", icon: "mdi-language-html5", level: 0 },
      { name: "CSS", icon: "mdi-language-css3", level: 0 },
      { name: "BOOTSTRAP", icon: "mdi-bootstrap", level: 0 },
      { name: "LARAVEL", icon: "mdi-laravel", level: 0 },
      { name: "SQL", icon: "mdi-database", level: 0 },
      { name: "JAVA", icon: "mdi-language-java", level: 0 },
    ]);

    const finalSkillLevels = [
      { name: "HTML", level: 80 },
      { name: "CSS", level: 85 },
      { name: "BOOTSTRAP", level: 75 },
      { name: "LARAVEL", level: 70 },
      { name: "SQL", level: 75 },
      { name: "JAVA", level: 80 },
    ];

    onMounted(() => {
      setTimeout(() => {
        skills.forEach((skill, index) => {
          const targetLevel = finalSkillLevels[index].level;
          const duration = 1500;
          const steps = 60;
          const increment = targetLevel / steps;
          let currentStep = 0;

          const intervalId = setInterval(() => {
            if (currentStep < steps) {
              skill.level = Math.min(
                Math.round(increment * (currentStep + 1)),
                targetLevel
              );
              currentStep++;
            } else {
              clearInterval(intervalId);
            }
          }, duration / steps);
        });
      }, 500);
    });

    const contactInfo = [
      {
        title: "Facebook",
        icon: "mdi-facebook",
        color: "#1877F2",
        link: "https://www.facebook.com/angel.sabrido",
      },
      {
        title: "GitHub",
        icon: "mdi-github",
        color: "#333",
        link: "https://github.com/Renshmackle",
      },
      {
        title: "LinkedIn",
        icon: "mdi-linkedin",
        color: "#0A66C2",
        link: "https://www.linkedin.com/in/renz-sabrido-53077318a",
      },
      {
        title: "Instagram",
        icon: "mdi-instagram",
        color: "#E4405F",
        link: "https://www.instagram.com/rnzz_brdzz/",
      },
    ];

    const socialIcons = [
      {
        name: "GitHub",
        icon: "mdi-github",
        link: "https://github.com/Renshmackle",
      },
      {
        name: "LinkedIn",
        icon: "mdi-linkedin",
        link: "https://www.linkedin.com/in/renz-sabrido-53077318a",
      },
      { name: "Twitter", icon: "mdi-twitter", link: "https://twitter.com" },
    ];

    const personalInfo = {
      Name: "Lawrence Sabrido",
      "Date of birth": "October 15, 2003",
      Address: "Barangay Taglatawan, Bayugan City, PH",
      "Zip code": "8502",
      Email: "renzsabrido1@gmail.com",
      Phone: "+639 7589",
    };

    const projectsCompleted = 3;
    const displayedProjects = ref(0);

    const downloadCV = () => {
      const link = document.createElement("a");
      link.href = "/Sab_Resume.pdf";
      link.download = "Lawrence_Sabrido_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log("Downloading CV...");
    };

    onMounted(() => {
      const duration = 2000;
      const steps = 30;
      const stepDuration = duration / steps;

      const animate = () => {
        let currentStep = 0;
        const intervalId = setInterval(() => {
          if (currentStep < steps) {
            displayedProjects.value = Math.floor(Math.random() * 10);
            currentStep++;
          } else {
            clearInterval(intervalId);
            displayedProjects.value = projectsCompleted;
          }
        }, stepDuration);
      };

      animate();
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    const services = [
      {
        title: "Web Design",
        icon: "mdi-palette",
        description:
          "Creating visually appealing and user-friendly website designs.",
      },
      {
        title: "UI/UX Design",
        icon: "mdi-pencil-ruler",
        description:
          "Designing intuitive user interfaces and seamless user experiences.",
      },
      {
        title: "Web Development",
        icon: "mdi-code-tags",
        description:
          "Building responsive and dynamic websites using modern technologies.",
      },
      {
        title: "App Development",
        icon: "mdi-cellphone",
        description:
          "Developing mobile applications for iOS and Android platforms.",
      },
      {
        title: "Website Maintenance",
        icon: "mdi-cog",
        description:
          "Providing ongoing support and updates for existing websites.",
      },
      {
        title: "Consulting Services",
        icon: "mdi-account-group",
        description:
          "Offering expert advice on web technologies and best practices.",
      },
    ];

    return {
      menuItems,
      activeSection,
      scrollToSection,
      handleCtaClick,
      isMenuOpen,
      projects,
      skills,
      currentPage,
      pages,
      dialog,
      contactInfo,
      socialIcons,
      personalInfo,
      projectsCompleted,
      displayedProjects,
      services,
      downloadCV,
      isScrolled,
    };
  },
};
</script>

<style>
.v-toolbar-title {
  font-family: "Bungee Hairline", sans-serif !important;
  font-weight: 400;
  font-style: normal;
  color: #ffffff;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Poppins", sans-serif !important;
  font-weight: 800;
  font-style: normal;
}

p {
  font-family: "Poppins", sans-serif !important;
}

.v-app-bar,
.v-btn {
  font-family: "Poppins", sans-serif !important;
}

.v-app-bar {
  transition: background-color 0.3s ease;
}

.glass-effect {
  background-color: rgba(0, 0, 0, 0.7) !important;
  backdrop-filter: blur(10px);
}

.v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.nav-btn {
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease;
}

.nav-btn::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #ffffff;
  transition: all 0.3s ease;
}

.nav-btn.active-section::after {
  width: 100%;
  left: 0;
}

.nav-btn.active-section {
  color: #ffbd39 !important;
}

.nav-btn:not(.active-section) {
  color: #ffffff !important;
}

.nav-btn:hover::after {
  width: 100%;
  left: 0;
}

.nav-btn:hover {
  color: #ffbd39 !important;
}

.mobile-menu-overlay {
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8) !important;
  backdrop-filter: blur(10px);
}

.mobile-menu-list {
  background: transparent !important;
}

.mobile-menu-item {
  font-family: "Poppins", sans-serif !important;
  color: #ffffff !important;
  transition: color 0.3s ease;
  padding: 8px 0;
}

.mobile-menu-item:hover {
  color: #ffbd39 !important;
}

.v-overlay__content {
  width: 100vw !important;
  height: 100vh !important;
}

.v-overlay__scrim {
  background: transparent !important;
  backdrop-filter: blur(10px);
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
}

.hero {
  background: #000000;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.8s ease;
}
.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 600px) {
  .hero {
    background-image: url("../public/images/me.png");
    background-size: cover;
    background-position: center;
  }

  .hero::before {
    content: "";
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

  .v-list-item__title {
    font-size: 1rem !important;
  }

  .mobile-menu-item {
    padding: 6px 0;
  }

  .close-btn {
    top: 10px;
    right: 10px;
  }
}

.yellow--text {
  color: #ffbd39 !important;
}

.v-list-item__title {
  font-family: "Poppins", sans-serif !important;
  color: white !important;
  font-size: 1.1rem !important;
  font-weight: 200;
  transition: color 0.3s ease;
}

.menu-item {
  display: block;
  width: 100%;
  padding: 12px 16px;
  transition: background-color 0.3s ease;
}

.menu-item:hover {
  background-color: rgba(255, 189, 57, 0.1);
}

.v-overlay__content {
  width: 100vw !important;
  height: 100vh !important;
}

.v-overlay__scrim {
  background: transparent !important;
  backdrop-filter: blur(10px);
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

.v-progress-linear {
  border-radius: 5px;
  height: 10px;
  overflow: hidden;
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

.hire-me-dialog {
  background-color: rgba(30, 30, 30, 0.8);
  backdrop-filter: blur(10px);
  color: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

.hire-me-dialog .v-card__title {
  background: linear-gradient(
    135deg,
    rgba(255, 189, 57, 0.8) 0%,
    rgba(255, 157, 0, 0.8) 100%
  );
  color: #000000;
  position: relative;
}

.elegant-title {
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.hire-me-dialog .v-list {
  background-color: transparent;
}

.contact-list {
  padding: 0;
}

.contact-item {
  transition: all 0.3s ease;
  border-radius: 8px;
  margin-bottom: 16px;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
}

.contact-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.contact-item .v-list-item__icon {
  margin-right: 16px;
}

.contact-item .v-list-item__content {
  flex: 1;
  display: flex;
  justify-content: center;
}

.hire-me-btn {
  background: linear-gradient(135deg, #ffbd39 0%, #ff9d00 100%);
  color: #000000;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.hire-me-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(255, 189, 57, 0.3);
}

/* Add this to your existing styles */
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.3s ease-in-out;
}

.dialog-bottom-transition-enter,
.dialog-bottom-transition-leave-to {
  transform: translateY(100%);
}
</style>
