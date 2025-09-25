import {
  getHeadingClass,
  getParagraphClass,
  getSectionClass,
  getAllowanceClass,
  getPageAllowanceClass,
  getDateClass,
  getSignatureClass,
} from "@/utils/typography";
import Link from "next/link"; // Import Link
import { UnderlineLink } from "@/app/components/ui/underline-link";
import { TransitionLink } from "@/app/components/PageTransition";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Mildly creative, chaotically inquisitive",

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "About - Obukofe Joseph",
    description: "Mildly creative, chaotically inquisitive",
    url: "https://obukofejoseph.com/about",
    siteName: "Obukofe Joseph",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/images/thumbnails/about.png",
        width: 1200,
        height: 630,
        alt: "Obukofe Joseph - Mildly creative, chaotically inquisitive",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About - Obukofe Joseph",
    description: "Mildly creative, chaotically inquisitive",
    creator: "@obukofejoe",
    images: [
      {
        url: "/images/thumbnails/about.png",
        width: 1200,
        height: 630,
        alt: "Obukofe Joseph - Mildly creative, chaotically inquisitive",
        type: "image/png",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    "max-snippet": 200,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": 200,
    },
  },

  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Obukofe Joseph",
      description: "Mildly creative, chaotically inquisitive",
      alternateName: "Obukofe Joe",
      url: "https://obukofejoseph.com/about",
      image: "https://obukofejoseph.com/images/thumbnails/about.png",
      sameAs: ["https://twitter.com/obukofejoe"],
    }),
  },
};

export default function AboutPage() {
  return (
    <section
      className={getSectionClass({
        includeMarginTop: false,
        includeMarginBottom: true,
      })}
    >
      <div className={getPageAllowanceClass({ axis: "py" })}></div>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        Hi there,
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        I'm Joe (@obukofejoe), a data scientist, gamer and a full-time selective
        yapper living in Lagos, Nigeria. I'm currently at PremiumTrust Bank as a
        Data Scientist - Product and doing my masters at the University of
        Stirling, Scotland.
      </p>
      <p className={getAllowanceClass({ axis: "py" })}></p>
      <h3 className={getHeadingClass(3, { responsive: true })}>(Extended)</h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        Hi — again.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        If there's one thing that really anchors how I live and learn, it's a
        phrase I hold close:
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        <i>Poco a Poco</i>, meaning <i>"Little by Little"</i> in Spanish.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        This alone is my whole damn way of moving through life, and it's more or
        less how I intentionally think about growth, and how I learn. It's also
        how I choose to build, with intention, in extremely fine granularity and
        piece by piece, with less noise and more signal.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        But here's the thing, I'm still learning. I didn't always know how to do
        "little by little." For years, I'd throw myself headfirst into seemingly
        important stuff, consuming everything all at once, burning out while at
        it, then wondering why I felt hollow afterward. I remember spending
        months trying to understand every aspect of machine learning, barely
        getting enough sleep, only to realize I couldn't actually build anything
        meaningful with all that scattered knowledge. That's when poco a poco
        stopped being just a nice phrase and started becoming an actual survival
        strategy.
      </p>
      <p className={getAllowanceClass({ axis: "py" })}></p>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        I don't like doing things on the surface.
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        While I'm not repulsed by it, it's also something I constantly try not
        to do whenever I get the chance to, and not also because I think depth
        is always better, but because I simply can't help but to go there. I get
        extremely fidgety around things that feel too shallow or half-baked,
        whether it's a function, or something as simple as a thought or even
        something as nuanced as star formation. My way of moving through with it
        is to comprehensively understand it from the inside out, not out of the
        need for perfectionism, but because I absolutely care enough to know.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        But there's a part of me I'm learning to embrace, and it is that depth
        doesn't mean overdoing, but rather being intentional and possibly
        structured when it makes sense, and maybe a tad understandably chaotic
        if it doesn't.
      </p>
      <p className={getAllowanceClass({ axis: "py" })}></p>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        The internet feels like noise these days, and honestly, I think that's
        part of what drives my need for depth.
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        It's crowded and overstimulating, and everyone's always either
        optimizing, scaling, or shipping stuff and it gets hard to breathe
        sometimes, harder to focus if even. Don't even get me started on the
        whole doomscrolling stuff, but the really weird (and maybe relatable)
        thing about it is that I love being deep in the chaos. There's something
        oddly reassuring about carving your own personal corner of the internet
        that feels "you", with zero pressure and all-in presence.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        This site is precisely that for me. A slow, zero-pressure archive that's
        all part me, a digital log of everything and anything I deeply care
        about, put together with mini-batches of hard-earned clarity. I built
        this because I needed a place where I could come back and remember how
        much I've grown, and where I could trace the messy, non-linear path from
        who I was to who I'm becoming.
      </p>
      <p className={getAllowanceClass({ axis: "py" })}></p>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        Most of what I do now is self-guided, which is both liberating and
        terrifying.
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        I make my own roadmaps, decide what to learn, how to learn it, and worry
        less about the "what for". I would definitely be meticulous, but not
        always methodical about it. Although I try, I firmly believe in
        wandering sometimes too.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        I think structure can be a double-edged sword, helpful yes, but also
        stifling sometimes. Most times, my best learning journeys didn't come
        from perfect plans but from getting completely lost in something I
        didn't fully understand, but still following it anyways.
      </p>
      <p className={getAllowanceClass({ axis: "py" })}></p>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        I strongly believe obsession beats discipline.
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        I know it's not a popular take in the era of hustle and productivity
        culture, but for me, obsession isn't always about burnout, but the joy
        that comes with it. I've done some of my best work not because I was
        told to, but mainly because I couldn't not do it.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        That's why I'll always choose learning what truly excites me over what's
        trendy. It's not exactly discipline but something much more primal.
      </p>
      <p className={getAllowanceClass({ axis: "py" })}></p>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        I am painfully reminded of the fact that I am a slow learner.
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        I constantly go over the same lessons and need far more time than I'd
        like to finally "get it." And I get super jealous of people who can just
        breeze through new concepts as if their minds were wired differently
        (which might be the case), as for the longest time, I always prioritized
        breadth over depth. But I've also come to feel that it's a pretty
        underrated superpower. Being "slow" forces me to be deliberate. It means
        that when something sticks, it really sticks. It also allows me to work
        things out at my own pace, and truthfully, I'm slow at almost everything
        in life, not just in learning. I eat slowly, I process slowly, I even
        walk slower than most people I know. It used to frustrate me, because in
        a world that worships speed, being slow feels like being left behind.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        And in a strange way, well much like my absolute disdain for coffee and
        mechanical keyboards, I've kind of made peace with it. The older I got,
        the more I realized that being slow is just another way of being
        present. It gives me space and time to notice details others overlook,
        and to let things settle instead of rushing past them.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        Maybe that's all the point really: the things that make me different are
        the same things that make me, me basically.
      </p>
      <p className={getAllowanceClass({ axis: "py" })}></p>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        Function over Form.
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        For some compelling reason, this is something I always keep coming back
        to. I've never been the guy obsessed with appearances for their own
        sake: the shine and all the flashy stuff. For me, if something doesn't
        work, it really doesn't matter how beautiful it looks. A tool should be
        useful before it's aesthetic, as a principle should be lived before it's
        performed.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        Maybe that's precisely why I don't mind being slow to learn, as it
        forces me to prioritize function, and I do that not because I want to
        show off in any way, but because I can use it effectively when the time
        comes (or purely out of the need for curiosity and obsession).
      </p>
      <p className={getAllowanceClass({ axis: "py" })}></p>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        I'm not trying to be meticulously perfect, I'm just trying to pay
        attention.
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        Pay attention to the way I work, the way I learn and think. I try not to
        get caught up in optimizing for speed or following the trend train, but
        to stay in love with the process I chose. Some days that means spending
        hours optimizing a process, other days it's loosely sketching out
        half-formed ideas and letting them percolate as much as they can.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        What I'm still figuring out though is how to trust my own timing, and
        how to know when I'm being thorough versus when I'm just procrastinating
        with research.
      </p>
      <p className={getAllowanceClass({ axis: "py" })}></p>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        I see myself as a collector of sorts.
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        Not of things in the material sense, but of stuff I find either
        intriguing or compelling. It could be a brutalist building or a well
        designed fit.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        That's what{" "}
        <TransitionLink
          href="/catalog"
          className="text-neutral-800 dark:text-neutral-200"
        >
          <UnderlineLink>Catalog</UnderlineLink>
        </TransitionLink>{" "}
        is for, and it's my personal organic archive of beautiful, odd, and
        stuff I term to be "meaningful". It's also where I keep the things that
        taught me something, even if I can't always articulate what that
        something is. You'd probably learn more about how my mind works by
        browsing through it than by reading this monologue.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        So if you've landed here, maybe you're wired a little like me too, and
        you can relate to building large stuff with mini, intentional and
        incremental steps, or you also probably get excited by questions that
        don't have clean and linear answers.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        If any of that resonates with you, I'm glad you're here.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        Thanks for stopping by.
      </p>
      <div className="py-2"></div>
      <div className="flex justify-start">
        <svg
          className="select-none w-11 h-auto"
          style={{
            transform: "rotate(-10deg)",
            transformOrigin: "left center",
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 51 41"
        >
          <path
            d="M47.8438 27.4375C48.0521 27.4375 48.3125 27.4375 48.625 27.4375C48.9583 27.4375 49.2812 27.4688 49.5938 27.5312C49.9062 27.5938 50.1771 27.6979 50.4062 27.8438C50.6354 27.9896 50.75 28.2188 50.75 28.5312C50.75 28.9896 50.625 29.3542 50.375 29.625C50.125 29.8958 49.7708 30.0312 49.3125 30.0312C49.25 30.0312 49.1354 30.0312 48.9688 30.0312C48.8229 30.0312 48.6667 30.0208 48.5 30C48.3333 29.9583 48.1771 29.9062 48.0312 29.8438C47.9062 29.7812 47.8438 29.6979 47.8438 29.5938V27.4375Z"
            fill="currentColor"
          />
          <path
            d="M33.25 28.375C32.8958 27.5833 32.7396 26.8125 32.7812 26.0625C32.8229 25.2917 32.9896 24.5729 33.2812 23.9063C33.5937 23.2188 33.9896 22.6042 34.4687 22.0625C34.9687 21.5 35.5 21.0208 36.0625 20.625C36.625 20.2083 37.1875 19.8958 37.75 19.6875C38.3333 19.4792 38.8437 19.3958 39.2812 19.4375C39.7187 19.4583 40.0625 19.6146 40.3125 19.9063C40.5625 20.1979 40.6458 20.6458 40.5625 21.25C40.5625 22.0625 40.3021 22.7708 39.7812 23.375C39.2812 23.9792 38.7187 24.5208 38.0937 25C37.4896 25.4792 36.9271 25.9167 36.4062 26.3125C35.9062 26.6875 35.6562 27.0417 35.6562 27.375C35.6562 27.5625 35.7604 27.7083 35.9687 27.8125C36.1979 27.9167 36.4583 28 36.75 28.0625C37.0417 28.1042 37.3333 28.1354 37.625 28.1563C37.9167 28.1771 38.125 28.1979 38.25 28.2188C40.2083 27.8021 41.6771 27.5521 42.6562 27.4688C43.6354 27.3646 44.25 27.375 44.5 27.5C44.75 27.6042 44.6979 27.7813 44.3437 28.0313C44.0104 28.2604 43.4896 28.5104 42.7812 28.7813C42.0729 29.0313 41.25 29.2604 40.3125 29.4688C39.375 29.6771 38.4479 29.8021 37.5312 29.8438C36.6146 29.8646 35.7604 29.7708 34.9687 29.5625C34.1979 29.3542 33.625 28.9583 33.25 28.375ZM38.7187 21.25C38.3021 21.25 37.9062 21.3646 37.5312 21.5938C37.1562 21.8229 36.8125 22.1146 36.5 22.4688C36.2083 22.8021 35.9583 23.1771 35.75 23.5938C35.5417 23.9896 35.3854 24.3646 35.2812 24.7188C35.3229 24.7396 35.3542 24.75 35.375 24.75H35.4687C35.7604 24.75 36.0937 24.625 36.4687 24.375C36.8437 24.125 37.1979 23.8229 37.5312 23.4688C37.8646 23.0938 38.1458 22.7083 38.375 22.3125C38.6042 21.9167 38.7187 21.5625 38.7187 21.25Z"
            fill="currentColor"
          />
          <path
            d="M22.5938 27.375C22.5938 27.2917 22.5938 27.125 22.5938 26.875C22.6146 26.6042 22.625 26.4271 22.625 26.3438C23.2917 24.8229 24.1458 23.4167 25.1875 22.125C26.2292 20.8333 27.4062 19.6875 28.7188 18.6875C28.7604 18.6875 28.8229 18.6771 28.9062 18.6562C29.0104 18.6146 29.0833 18.5938 29.125 18.5938C29.6875 18.5938 30.1458 18.7188 30.5 18.9688C30.875 19.1979 31.1667 19.5104 31.375 19.9062C31.6042 20.2812 31.7604 20.7083 31.8438 21.1875C31.9271 21.6458 31.9688 22.0938 31.9688 22.5312C31.9688 23.3438 31.7812 24.1979 31.4062 25.0938C31.0312 25.9688 30.5208 26.7812 29.875 27.5312C29.25 28.2604 28.5312 28.8646 27.7188 29.3438C26.9062 29.8021 26.0625 30.0312 25.1875 30.0312C24.3125 30.0312 23.6562 29.8021 23.2188 29.3438C22.8021 28.8646 22.5938 28.2083 22.5938 27.375ZM25.0312 27C25.0312 27.2292 25.125 27.3854 25.3125 27.4688C25.5 27.5521 25.6875 27.5938 25.875 27.5938C26.3958 27.5938 26.8958 27.4583 27.375 27.1875C27.875 26.8958 28.3125 26.5417 28.6875 26.125C29.0833 25.6875 29.3958 25.2083 29.625 24.6875C29.8542 24.1667 29.9688 23.6667 29.9688 23.1875C29.9688 22.9583 29.9479 22.7083 29.9062 22.4375C29.8854 22.1458 29.8229 21.8958 29.7188 21.6875C29.6146 21.4583 29.4479 21.2812 29.2188 21.1562C29.0104 21.0312 28.7083 21.0104 28.3125 21.0938C28.0208 21.1562 27.6875 21.4271 27.3125 21.9062C26.9375 22.3854 26.5729 22.9479 26.2188 23.5938C25.8854 24.2188 25.6042 24.8542 25.375 25.5C25.1458 26.125 25.0312 26.625 25.0312 27Z"
            fill="currentColor"
          />
          <path
            d="M1.09385 40.0625C0.948014 40.0208 0.812598 39.9479 0.687598 39.8438C0.562598 39.7604 0.479264 39.6562 0.437598 39.5312C0.375098 39.4062 0.364681 39.2812 0.406348 39.1562C0.427181 39.0312 0.531348 38.9271 0.718848 38.8438C1.63551 38.5312 2.51051 38.1979 3.34385 37.8438C4.17718 37.4896 4.94801 37.0625 5.65635 36.5625C6.38551 36.0833 7.04176 35.5 7.6251 34.8125C8.22926 34.125 8.7501 33.3021 9.1876 32.3438L20.5626 8.0625H20.1563C20.1147 8.0625 19.8855 8.15625 19.4688 8.34375C19.0522 8.53125 18.5626 8.75 18.0001 9C17.4584 9.25 16.8959 9.51042 16.3126 9.78125C15.7293 10.0521 15.2605 10.2812 14.9063 10.4688C14.4063 10.7188 13.823 11.0729 13.1563 11.5312C12.5105 11.9688 11.8334 12.4792 11.1251 13.0625C10.4376 13.6458 9.76051 14.2812 9.09385 14.9688C8.42718 15.6354 7.82301 16.3229 7.28135 17.0312C6.76051 17.7188 6.33343 18.4062 6.0001 19.0938C5.6876 19.7812 5.53135 20.4167 5.53135 21C5.53135 21.2292 5.57301 21.4271 5.65635 21.5938C5.76051 21.7604 5.8751 21.9271 6.0001 22.0938C6.1251 22.2396 6.22926 22.4062 6.3126 22.5938C6.41676 22.7604 6.46885 22.9479 6.46885 23.1562C6.03135 23.1562 5.65635 23.0833 5.34385 22.9375C5.03135 22.7708 4.77093 22.5625 4.5626 22.3125C4.3751 22.0417 4.22926 21.7396 4.1251 21.4062C4.04176 21.0729 4.0001 20.7292 4.0001 20.375C4.0001 19.8333 4.09385 19.3229 4.28135 18.8438C4.46885 18.3438 4.70843 17.875 5.0001 17.4375C5.3126 16.9792 5.65635 16.5521 6.03135 16.1562C6.40635 15.7396 6.79176 15.3333 7.1876 14.9375C7.52093 14.6042 7.96885 14.1771 8.53135 13.6562C9.09385 13.1146 9.65635 12.5833 10.2188 12.0625C10.7813 11.5417 11.2813 11.0938 11.7188 10.7188C12.1563 10.3229 12.4063 10.1042 12.4688 10.0625L22.1876 4.8125C22.6459 4.54167 23.0418 4.15625 23.3751 3.65625C23.7293 3.15625 24.073 2.66667 24.4063 2.1875C24.7605 1.6875 25.1563 1.26042 25.5938 0.90625C26.0313 0.53125 26.5834 0.34375 27.2501 0.34375C27.4376 0.34375 27.6043 0.385417 27.7501 0.46875C27.8959 0.53125 28.0626 0.625 28.2501 0.75C28.2709 0.833333 28.2813 1.01042 28.2813 1.28125C28.3022 1.53125 28.3126 1.69792 28.3126 1.78125C28.3126 2.05208 28.3126 2.27083 28.3126 2.4375C28.3126 2.58333 28.2813 2.71875 28.2188 2.84375C28.1772 2.94792 28.0938 3.05208 27.9688 3.15625C27.8647 3.26042 27.6876 3.40625 27.4376 3.59375C27.2501 3.73958 26.9168 3.98958 26.4376 4.34375C25.9793 4.69792 25.4793 5.11458 24.9376 5.59375C24.3959 6.05208 23.8751 6.54167 23.3751 7.0625C22.8959 7.5625 22.5626 8.03125 22.3751 8.46875L15.2813 22.625C15.2605 22.7292 15.198 22.9375 15.0938 23.25C15.0105 23.5417 14.948 23.7396 14.9063 23.8438C14.7397 24.1771 14.5209 24.625 14.2501 25.1875C14.0001 25.7292 13.7188 26.3229 13.4063 26.9688C13.1147 27.5938 12.8022 28.25 12.4688 28.9375C12.1563 29.6042 11.8543 30.2292 11.5626 30.8125C11.2918 31.3958 11.0522 31.8958 10.8438 32.3125C10.6355 32.75 10.4897 33.0312 10.4063 33.1562C10.0522 33.8438 9.54176 34.6146 8.8751 35.4688C8.22926 36.3229 7.48968 37.1146 6.65635 37.8438C5.82301 38.5729 4.92718 39.1562 3.96885 39.5938C3.01051 40.0312 2.05218 40.1875 1.09385 40.0625Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
