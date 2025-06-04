// Elements
let video = document.getElementById("video1");
let knop = document.getElementById("troll-knop");
let popup = document.getElementById("pop-up")

// Config
const facts = [
  "Australia is wider than the moon.",
  "Headphones can increase the bacteria in your ears.",
  "Scotland chose the unicorn as its national animal.",
  "Avocados are not vegetables.",
  "The Eiffel Tower gets taller in the summer.",
  "Human teeth are the only part of the body that can’t heal themselves.",
  "Switzerland prohibits the ownership of just one guinea pig.",
  "Tigers have striped skin.",
  "A shrimp’s heart is in its head.",
  "An 11-year-old accidentally invented ice pops."
]

// Functions
const pp = () => {
  if (video1.paused) {
    video1.play()
}}

const show_hide = () => video.style.display = video.style.display === "none"? "block": "none"
const troll = () => knop.style.display = knop.style.display === "none"? "block": "none"
const colorChange = () => document.body.style.backgroundColor = "#dc143c"

// Display pop up
setTimeout(() => popup.style.display = "flex", 10000);
setInterval(() => alert(facts[Math.floor(Math.random() * facts.length)]), 5000)