# Bad Prompt vs. Good Prompt: Content Publishing

## Example 1: Writing a Long-Form Article

### Bad Prompt

```
Write a blog post about productivity tips for remote workers.
```

### What You Get

> In today's fast-paced world, remote work has become increasingly common. Working from home can be challenging, but with the right strategies, you can maximize your productivity. Here are some essential tips to help you thrive as a remote worker:
>
> 1. **Create a dedicated workspace**: Having a designated area for work helps you stay focused...
> 2. **Establish a routine**: Start your day at the same time every morning...
> 3. **Take regular breaks**: The Pomodoro Technique suggests working in 25-minute intervals...
> 4. **Communicate proactively**: Stay in touch with your team using tools like Slack or Zoom...
> 5. **Set boundaries**: Make sure your family or housemates know your working hours...

### Why It Failed

This is the platonic form of content slop. The opening phrase "In today's fast-paced world" is the canonical AI tell. Every tip ("create a dedicated workspace", "establish a routine") could be found in the first Google result from 2015. Nothing here requires knowing anything about the specific reader, their situation, or what they've already tried. The delete test fails every paragraph — nothing would be lost by removing any of them except the word count. A human reader gains zero information they didn't already have.

### Good Prompt

```
I'm writing for experienced remote workers who've been doing it 2+ years — not people who need "create a workspace" advice. They've solved the basics. The audience is people who are remote-capable but struggling with specific problems: calendar creep, async coordination failure, and the feeling that they're never fully off.

Article: "The Remote Work Problems Nobody Talks About Anymore"

Angle: Most remote work advice is for beginners. This is for people who've optimized the obvious stuff and are still struggling. We're addressing the second-order problems.

Constraints:
- First sentence cannot be a question or a generic scene-setter
- No tips. This is analytical, not listicle.
- Each section should make one specific, arguable claim — not a general observation
- 1200-1500 words
- Target reader has read at least 3 books on productivity and found them useful but insufficient

Draft the intro and two body sections.
```

### What You Get

> The Pomodoro timer is a solved problem. So is the home office setup, the morning routine, the "shutdown ritual," and the deliberate commute. Experienced remote workers have these optimized. What they haven't solved is the meta-problem: the way remote work warps time and attention in ways that no amount of tactical optimization addresses.
>
> **The calendar isn't the problem. Your relationship with availability is.**
>
> Remote work doesn't eliminate meetings — it makes meetings feel optional, which makes every meeting feel vaguely like a failure. When you can join from anywhere, there's no natural reason to decline. The result isn't fewer meetings; it's meetings that sprawl into dead time and evenings, because the friction that used to constrain scheduling (travel time, room availability, people being in different buildings) is gone. The experienced remote worker has filled this vacuum with "I'll just decline things that aren't relevant to me" — which works until you realize you've been declining things your peers haven't, and the information asymmetry is starting to show.
>
> ...

### Why It Works

The negative constraint ("no tips", "not for beginners") defined the category the content should NOT be in. The specific reader profile ("read at least 3 productivity books") gave Claude a lens — this reader is already sophisticated, so the content needs to operate above the baseline. The explicit angle ("second-order problems") forced an analytical frame rather than a practical one. The first-sentence constraint prevented the most common opening failure mode.

---

## Example 2: Social Media Content

### Bad Prompt

```
Write some LinkedIn posts about my startup that I can share.
```

### What You Get

> 🚀 Excited to announce that we've hit a major milestone! Our team has been working incredibly hard to build something truly special...
>
> 💡 The journey of entrepreneurship is filled with ups and downs. But every challenge makes us stronger...
>
> 🎯 We believe that innovation starts with asking the right questions. That's why we're committed to disrupting the industry...

### Why It Failed

These posts could be from any startup in any industry. The rocket emoji, the milestone announcement, the "journey of entrepreneurship" — this is the exact content pattern that makes people scroll past. It doesn't say what the company does, what milestone was hit, or why anyone should care. The engagement bait ("every challenge makes us stronger") is the LinkedIn equivalent of "It's worth noting." The `2.6 content-publishing.md` voice rules exist specifically to prevent this.

### Good Prompt

```
LinkedIn posts for [company]: B2B SaaS that helps procurement teams audit vendor contracts for hidden auto-renewal clauses and price escalations.

Audience: CFOs, procurement directors, and VP Finance at mid-market companies ($50M-$500M revenue).

Recent event to post about: We caught a $240K auto-renewal clause for a customer last week — 3-year contract for a software they stopped using 18 months ago. They nearly missed the 60-day cancellation window.

Voice: Direct, no startup cheerleading, no vague innovation language. Written as someone who's been in enterprise procurement, not a startup founder trying to sound relatable.

Write 3 posts, each with a different angle:
1. The story of what happened (specific, not vague)
2. The systemic problem this reveals
3. A provocative claim about how procurement teams currently handle this
```

### What You Get

> **Post 1:**
>
> A customer called us last Tuesday in a panic.
>
> They had a $240,000 renewal coming up — a 3-year enterprise contract for software their team stopped using 18 months ago. The cancellation window was 60 days out. They'd have missed it entirely.
>
> We caught it in the audit. They cancelled. Crisis averted.
>
> The contract was written clearly. The auto-renewal clause wasn't buried — it was on page 3. They just hadn't looked at it since signing.
>
> This is the actual problem. Not malicious vendors. Not hidden fine print. Just contracts that nobody re-reads after the signature.
>
> ---
>
> **Post 3:**
>
> Most procurement teams trust their contract management system to surface renewals.
>
> They shouldn't.
>
> Contract management systems track dates. They don't read contracts. The difference is the gap between "this contract renews on March 15th" and "this contract has a 90-day notice window, a 12% annual escalation after year 1, and an auto-renewal that locks you into enterprise terms if you miss it."
>
> Your CLM knows the first. It has no idea about the second.

### Why It Works

The specific story (real amounts, real timeframe, real consequence) gave Claude material to write FROM, not material to describe generically. The voice instruction ("not a startup founder trying to sound relatable") eliminated the cheerleading pattern. Three distinct angles forced three different posts instead of variations on the same message. The audience profile (CFO/VP Finance level) calibrated the complexity — these readers don't need procurement basics explained.
