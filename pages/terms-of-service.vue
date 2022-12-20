<template>
  <div id="terms-of-service">
    <div class="container">

      <section class="my-8">
        <h1 class="text-2xl font-bold mb-2">Terms of Service</h1>
        <p class="text-sm text-gray-500 mb-8">Welcome to JajanTerus, a marketplace platform that allows users to buy and sell a wide range of items. By accessing or using our website, you agree to be bound by the following terms of service.</p>

        <div class="mb-4">
          <h2 class="text-lg font-bold mb-1">I. Eligibility</h2>
          <p class="text-sm text-gray-500 mb-4">In order to use JajanTerus, you must be at least 18 years old and have the legal capacity to enter into a binding contract. If you are under the age of 18, you may only use JajanTerus with the supervision of a parent or legal guardian.</p>
        </div>

        <div class="mb-4">
          <h2 class="text-lg font-bold mb-1">II. User accounts</h2>
          <p class="text-sm text-gray-500 mb-4">In order to use certain features of JajanTerus, you must create a user account and provide certain personal information, such as your name, email address, and a valid payment method. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.</p>
        </div>

        <div class="mb-4">
          <h2 class="text-lg font-bold mb-1">III. Listing and selling items</h2>
          <p class="text-sm text-gray-500 mb-4">As a seller on JajanTerus, you are responsible for accurately describing the items you are selling and for setting appropriate prices. You must also comply with all applicable laws and regulations, including those related to taxation and consumer protection.</p>
        </div>

        <div class="mb-4">
          <h2 class="text-lg font-bold mb-1">IV. Transactions</h2>
          <p class="text-sm text-gray-500 mb-4">All transactions that take place on JajanTerus are between the buyer and the seller. JajanTerus is not a party to these transactions and is not responsible for any issues that may arise, including but not limited to disputes over payment, shipping, or the condition of the item.</p>
        </div>

        <div class="mb-4">
          <h2 class="text-lg font-bold mb-1">V. Prohibited items</h2>
          <p class="text-sm text-gray-500 mb-4">JajanTerus reserves the right to remove any listings that violate our policies or are deemed inappropriate for our platform. Prohibited items include, but are not limited to, illegal items, counterfeits, stolen goods, and items that infringe on intellectual property rights.</p>
        </div>

        <div class="mb-4">
          <h2 class="text-lg font-bold mb-1">VI. Termination of accounts</h2>
          <p class="text-sm text-gray-500 mb-4">JajanTerus reserves the right to terminate the accounts of any users who violate our policies or engage in fraudulent or malicious activities.</p>
        </div>

        <div class="mb-4">
          <h2 class="text-lg font-bold mb-1">VII. Disclaimer of warranties</h2>
          <p class="text-sm text-gray-500 mb-4">JajanTerus is provided "as is" without warranty of any kind, either express or implied. We do not guarantee the accuracy or completeness of the information on our website, and we will not be liable for any errors or omissions.</p>
        </div>

        <div class="mb-4">
          <h2 class="text-lg font-bold mb-1">VIII. Limitation of liability</h2>
          <p class="text-sm text-gray-500 mb-4">In no event will JajanTerus be liable for any damages, including but not limited to indirect, incidental, consequential, or punitive damages, arising out of or in connection with the use of our website.</p>
        </div>

        <div class="mb-8">
          <h2 class="text-lg font-bold mb-1">IX. Changes to these terms of service</h2>
          <p class="text-sm text-gray-500 mb-4">JajanTerus reserves the right to modify or update these terms of service at any time. It is your responsibility to review and comply with the most current version of these terms.</p>
        </div>

        <p class="text-sm text-gray-500">By using JajanTerus, you acknowledge and agree to these terms of service. If you have any questions or concerns, please don't hesitate to contact us. Thank you for using JajanTerus.</p>

      </section>

    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
useHead({
  title: 'Terms of Service',
  titleTemplate: 'Terms of Service | JajanTerus',
  meta: [
    { name: 'description', content: 'Welcome to JajanTerus, a marketplace platform that allows users to buy and sell a wide range of items. By accessing or using our website, you agree to be bound by the following terms of service.' },
    { property: 'og:url', content: `${config.public.frontendUrl}/terms-of-service` },
    { property: 'og:description', content: 'Welcome to JajanTerus, a marketplace platform that allows users to buy and sell a wide range of items. By accessing or using our website, you agree to be bound by the following terms of service.' },
    { property: 'twitter:description', content: 'Welcome to JajanTerus, a marketplace platform that allows users to buy and sell a wide range of items. By accessing or using our website, you agree to be bound by the following terms of service.' },
  ]
})
</script>
