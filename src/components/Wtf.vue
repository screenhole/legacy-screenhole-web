<template>
    <div class="content">
        <section>
          <img src="../assets/img/wtf/wtf.png" alt="What the actual fuck?">
          <p>
            Screenhole is an experiment run by <a href="http://thinko.com">Thinko</a>. It's a place to hang out and share "grabs" you take from your Mac or iPhone.
          </p>
          <p>There's no drag &amp; drop, or editing. You can only post grabs with our fun apps. We encourage you to post as much as you like.</p>
        </section>

        <section>
          <h1>How do I register?</h1>
          <p>We're not trying to cram this place with a flood of users, so invitations are limited. You can buy an invite code. Think of it like a cover fee. There is no&nbsp;warranty!</p>

          <p>Send $4.20 to $thinko on Square Cash or PayPal, and we'll hook you up.</p>
        </section>

        <section>
          <h1>Instructions</h1>

          <h2>Log in with the Desktop App</h2>
          <p>Make sure you have the Desktop app running FIRST, and then <a href="/login">log in</a> on the web. If you were already logged in on the web, log out and back in again with the desktop app running. We automatically connect your account!</p>

          <h2>Post a Grab from Desktop</h2>
          <p>Make sure the app is running in the menubar, then use the shortcut:</p>
          <p><code>Control + Option + Command + s</code></p>

          <h2>Post a Grab from iPhone</h2>
          <p>Take a screenshot &amp; open the app within an hour. Tap FIRE IN THE HOLE.</p>

          <h2>Leave a Voice Memo</h2>
          <p>Click the little telephone icon above a post, and follow the prompts. Make sure to say something funny if you want people to like you.</p>

          <h1>Get in touch</h1>
          <p>Since this whole thing is crazy, expect rough edges 🤭 . If you find a bug, or get stuck, email <a href="mailto:screenhole@thinko.com">screenhole@thinko.com</a>, and we'll get back to you. HAVE FUN!</p>

          <p>- Last updated by <a href="/pasquale">@pasquale</a> at 1:10am, Dec 14, 2017</p>
        </section>
    </div>

</template>

<script>
</script>

<style lang="scss" scoped>
@import "~resources";

.content {
    margin: 0 auto 50px auto;
    padding: 50px;
    max-width: 1000px;

    section {
      color: #858090;
      line-height: 150%;

      & + section {
        margin-top: 100px;
      }

      h1 {
        color: white;
      }

      p + h2, p + h1 {
        margin-top: 75px;
      }
      p {
        max-width: 640px;
        margin: 25px 0;
      }

      code {
        display: inline-block;
        clear: both;
        background-color: rgba(255,255,255,0.1);
      }
      a {
        color: $purple;
      }
    }

    img {
        display: block;
        max-width: 100%;
        border-radius: 5px;
    }
}

</style>
