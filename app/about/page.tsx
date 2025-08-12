import {
  getHeadingClass,
  getParagraphClass,
  getSectionClass,
  getAllowanceClass,
  getPageAllowanceClass,
  getDateClass,
} from "@/utils/typography";
import Link from "next/link"; // Import Link
import { UnderlineLink } from "@/app/components/ui/underline-link";

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
        I’m Joe (@obukofejoe), a data scientist, gamer and a full-time selective
        yapper living in Lagos, Nigeria. I’m currently at PremiumTrust Bank as a
        Data Scientist - Product and doing my masters at the University of
        Stirling, Scotland.
      </p>
      <p className={getAllowanceClass({ axis: "py" })}></p>
      <h3 className={getHeadingClass(3, { responsive: true })}>(Extended)</h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        Hi — again.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        If there’s one thing that really anchors how I live and learn, it’s a
        phrase I hold close:
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        <i>Poco a Poco</i>, meaning <i>“Little by Little”</i> in Spanish.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        This alone is my whole damn way of moving through life, and it’s more or
        less how I intentionally think about growth, and how I learn. It’s also
        how I choose to build, with intention, in extremely fine granularity and
        piece by piece, with less noise and more signal.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        But here’s the thing, I’m still learning. I didn’t always know how to do
        “little by little.” For years, I’d throw myself headfirst into seemingly
        important stuff, consuming everything at once, burning out while at it,
        then wondering why I felt hollow afterward. I remember spending months
        trying to understand every aspect of machine learning, barely getting
        enough sleep, only to realize I couldn’t actually build anything
        meaningful with all that scattered knowledge. That’s when poco a poco
        stopped being just a nice phrase and started becoming an actual survival
        strategy.
      </p>
      <p className={getAllowanceClass({ axis: "py" })}></p>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        I don’t like doing things on the surface.
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        While I’m not repulsed by it, it’s also something I constantly try not
        to do whenever I get the chance to, and not also because I think depth
        is always better, but because I simply can’t help but to go there. I get
        extremely fidgety around things that feel too shallow or half-baked,
        whether it’s a function, or something as simple as a thought or even
        something as nuanced as star formation. My way of moving through with it
        is to comprehensively understand it from the inside out, not out of the
        need for perfectionism, but because I absolutely care enough to know.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        But there’s a part of me I’m learning to embrace, and it is that depth
        doesn’t mean overdoing, but rather being intentional, honest, and
        possibly structured when it makes sense, and maybe a tad understandably
        chaotic if it doesn’t.
      </p>
      <p className={getAllowanceClass({ axis: "py" })}></p>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        The internet feels like noise these days, and honestly, I think that's
        part of what drives my need for depth.
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        It’s crowded and overstimulating, and everyone’s always either
        optimizing, scaling, or shipping stuff and it gets hard to breathe
        sometimes, harder to focus if even. Don’t even get me started on the
        doomscrolling, but the really weird (and maybe relatable) thing about it
        is that I love being deep in the chaos. There’s something oddly
        reassuring about carving your own personal corner of the internet that
        feels “you”, with zero pressure and all-in presence.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        This site is precisely that for me. A slow, zero-pressure archive that’s
        all part me, a log of everything and anything I deeply care about, put
        together with mini-batches of hard-earned clarity. I built this because
        I needed a place where I could come back and remember how much I’ve
        grown, and not just that I simply did. Where I could trace the messy,
        non-linear path from who I was to who I’m becoming.
      </p>
      <p className={getAllowanceClass({ axis: "py" })}></p>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        Most of what I do now is self-guided, which is both liberating and
        terrifying.
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        I make my own roadmaps, decide what to learn, and worry less about the
        “what for”. I would definitely be meticulous, but not always methodical
        about it. Although I try, I firmly believe in wandering sometimes too.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        I think structure can be a double-edged sword, helpful yes, but also
        stifling. Most times, my best learning journeys didn’t come from perfect
        plans but from getting completely lost in something I didn’t fully
        understand, but still following it anyways. That’s why I came up with a
        term for it – “messy inquisitiveness”, and I think it’s my very own
        superpower.
      </p>
      <p className={getAllowanceClass({ axis: "py" })}></p>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        I strongly believe obsession beats discipline.
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        I know it’s not a popular take in the era of hustle and productivity
        culture, but for me, obsession isn’t always about burnout, but the joy
        that comes with it. I’ve done some of my best work not because I was
        told to, but mainly because I couldn’t not do it.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        That’s why I’ll always choose learning what truly excites me over what’s
        trendy. It’s not exactly discipline but something much more primal.
      </p>
      <p className={getAllowanceClass({ axis: "py" })}></p>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        I’m not trying to be meticulously perfect, I'm just trying to pay
        attention.
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        Pay attention to the way I work, the way I learn and think. I try not to
        get caught up in optimizing for speed or following the trend train, but
        to stay in love with the process I chose. Some days that means spending
        hours perfecting a single function, other days it’s loosely sketching
        out half-formed ideas and letting them percolate.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        What I’m still figuring out is how to trust my own timing. How to know
        when I’m being thorough versus when I’m just procrastinating with
        research.
      </p>
      <p className={getAllowanceClass({ axis: "py" })}></p>
      <h3 className={getHeadingClass(3, { responsive: true })}>
        I see myself as a collector of sorts.
      </h3>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        Not of things in the material sense, but of stuff I find either
        intriguing or compelling. It could be a brutalist building, an
        engineering marvel or a well designed fit.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        That’s what Catalog is for, and it’s my personal living archive of
        beautiful, odd, and stuff I term to be meaningful. It’s also where I
        keep the things that taught me something, even if I can’t always
        articulate what that something is. You’d probably learn more about how
        my mind works by browsing through it than by reading this monologue.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        So if you’ve landed here, maybe you’re wired a little like me too, and
        you can relate to building large stuff with mini, intentional and
        incremental steps, or you also get excited by questions that don’t have
        clean answers.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        If any of that resonates with you, I’m glad you’re here.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        Thanks for stopping by.
      </p>
      <p className={getParagraphClass({ responsive: true, muted: true })}>
        Joe.
      </p>
    </section>
  );
}
