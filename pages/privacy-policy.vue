<template>
  <div id="privacy-policy">
    <div class="container">

      <Breadcrumbs :crumbs="crumbs" />

      <section class="my-8">
        <div class="mb-4">
          <h1 class="text-2xl font-bold mb-1">Privacy Policy</h1>
          <p class="text-sm text-gray-500">At JajanTerus, we are committed to protecting the privacy of our users. This privacy policy explains how we collect, use, and protect the personal information of our users.</p>
        </div>

        <div class="mb-4">
          <h2 class="text-lg font-bold mb-1">Personal Information Collected</h2>
          <div class="text-sm text-gray-500">
            <p class="mb-2">When you create an account on JajanTerus, we collect the following personal information:</p>

            <ul class="list-disc ml-3 text-sm text-gray-500 mb-2">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your phone number</li>
              <li>Your payment information</li>
            </ul>

            <p class="mb-2">We may also collect additional personal information when you make a purchase on JajanTerus, such as your billing and shipping address.</p>
          </div>
        </div>

        <div class="mb-4">
          <h2 class="text-lg font-bold mb-1">How Personal Information is Used</h2>
          <div class="text-sm text-gray-500">
            <p class="mb-2">We use the personal information we collect from our users for the following purposes:</p>

            <ul class="list-disc ml-3 text-sm text-gray-500 mb-2">
              <li>To process transactions and complete purchases on JajanTerus</li>
              <li>To communicate with our users, such as to send updates or confirmations</li>
              <li>To improve the user experience on JajanTerus, such as by personalizing content or recommending products</li>
            </ul>
          </div>
        </div>

        <div class="mb-4">
          <h2 class="text-lg font-bold mb-1">Protection of Personal Information</h2>
          <div class="text-sm text-gray-500">
            <p class="mb-2">We take the protection of our users' personal information seriously. We have implemented appropriate technical and organizational measures to ensure the security of personal information, such as secure servers, encryption, and data backups.</p>
          </div>
        </div>

        <div class="mb-4">
          <h2 class="text-lg font-bold mb-1">Rights of Users</h2>
          <div class="text-sm text-gray-500">
            <p class="mb-2">As a user of JajanTerus, you have the following rights in relation to your personal information:</p>

            <ul class="list-disc ml-3 text-sm text-gray-500 mb-2">
              <li>The right to access the personal information that we have collected about you</li>
              <li>The right to correct any errors in your personal information</li>
              <li>The right to request the deletion of your personal information</li>
            </ul>
          </div>
        </div>

        <div class="mb-4">
          <h2 class="text-lg font-bold mb-1">Third-Party Services</h2>
          <div class="text-sm text-gray-500">
            <p class="mb-2">We may use third-party services to collect or process personal information on behalf of JajanTerus. These services may include payment processors and analytics providers.</p>
          </div>
        </div>

        <div class="mb-4">
          <h2 class="text-lg font-bold mb-1">Changes to this Privacy Policy</h2>
          <div class="text-sm text-gray-500">
            <p class="mb-2">We may update this privacy policy from time to time to reflect changes to our practices or legal requirements. If we make any material changes to this privacy policy, we will notify our users by email or through a prominent notice on our website.</p>
            <p class="mb-2">This privacy policy was last updated on December 20, 2022.</p>
          </div>
        </div>

        <div class="mb-4">
          <h2 class="text-lg font-bold mb-1">Contact Us</h2>
          <div class="text-sm text-gray-500">
            <p class="mb-2">If you have any questions or concerns about our privacy policy, please contact us at <a href="mailto:contact@jajanterus.com" class="text-primary underline font-semibold">contact@jajanterus.com.</a></p>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

useHead({
  title: 'Privacy Policy',
  titleTemplate: 'Privacy Policy | JajanTerus',
  meta: [
    { name: 'description', content: 'At JajanTerus, we are committed to protecting the privacy of our users. This privacy policy explains how we collect, use, and protect the personal information of our users.' },
    { property: 'og:url', content: `${config.public.frontendUrl}/privacy-policy` },
    { property: 'og:title', content: 'Privacy Policy | JajanTerus' },
    { property: 'og:description', content: 'At JajanTerus, we are committed to protecting the privacy of our users. This privacy policy explains how we collect, use, and protect the personal information of our users.' },
    { property: 'twitter:description', content: 'At JajanTerus, we are committed to protecting the privacy of our users. This privacy policy explains how we collect, use, and protect the personal information of our users.' },
  ]
})

const crumbs = ref([
  {name: 'Home', link: '/'},
  {name: 'Privacy Policy', link: null}
])
</script>
