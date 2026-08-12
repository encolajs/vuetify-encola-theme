<script setup lang="ts">
// Multi-step wizard: flat step indicator + VWindow, no Material stepper.
import { computed, ref } from 'vue'
import { Check } from '@lucide/vue'
import EFormField from '@/components/EFormField.vue'

const steps = [
  { title: 'Account', subtitle: 'Your credentials' },
  { title: 'Company', subtitle: 'Organization details' },
  { title: 'Plan', subtitle: 'Pick what fits' },
  { title: 'Done', subtitle: 'Review & finish' },
]

const step = ref(0)
const plan = ref('startup')
const done = ref(false)

const isLast = computed(() => step.value === steps.length - 1)

function next() {
  if (isLast.value) done.value = true
  else step.value++
}
</script>

<template>
  <div class="d-flex flex-column ga-6 e-page-narrow--sm">
    <div>
      <h1 class="text-headline-medium">Form wizard</h1>
      <p class="text-body-medium mt-1" style="opacity: 0.7">
        A flat multi-step form: step indicator + VWindow.
      </p>
    </div>

    <VCard>
      <VCardText>
        <!-- step indicator -->
        <div class="d-flex align-center mb-6">
          <template v-for="(s, i) in steps" :key="s.title">
            <div class="d-flex align-center ga-3">
              <VAvatar
                size="28"
                :color="i < step ? 'primary' : i === step ? 'primary' : 'surface-accented'"
                :variant="i === step ? 'flat' : i < step ? 'flat' : 'flat'"
              >
                <VIcon v-if="i < step" :icon="Check" size="14" />
                <span v-else class="text-label-medium">{{ i + 1 }}</span>
              </VAvatar>
              <div class="d-none d-sm-block">
                <div class="text-label-large">{{ s.title }}</div>
                <div class="text-body-small" style="opacity: 0.6">{{ s.subtitle }}</div>
              </div>
            </div>
            <VDivider v-if="i < steps.length - 1" class="mx-4" />
          </template>
        </div>

        <VWindow v-model="step">
          <VWindowItem :value="0">
            <div class="d-flex flex-column ga-4">
              <EFormField label="Email" required>
                <VTextField placeholder="you@example.com" type="email" />
              </EFormField>
              <EFormField label="Password" required help="At least 8 characters.">
                <VTextField placeholder="••••••••" type="password" />
              </EFormField>
            </div>
          </VWindowItem>

          <VWindowItem :value="1">
            <div class="d-flex flex-column ga-4">
              <EFormField label="Company name" required>
                <VTextField placeholder="Acme Inc." />
              </EFormField>
              <EFormField label="Company size">
                <VSelect :items="['1–10', '11–50', '51–200', '200+']" placeholder="Select a range" />
              </EFormField>
              <EFormField label="Website">
                <VTextField placeholder="https://acme.com" type="url" />
              </EFormField>
            </div>
          </VWindowItem>

          <VWindowItem :value="2">
            <VRadioGroup v-model="plan">
              <div class="d-flex flex-column ga-3">
                <VCard
                  v-for="p in [
                    { value: 'startup', title: 'Startup', desc: '$19/month — up to 10 seats' },
                    { value: 'business', title: 'Business', desc: '$49/month — up to 50 seats' },
                    { value: 'enterprise', title: 'Enterprise', desc: 'Custom pricing — unlimited' },
                  ]"
                  :key="p.value"
                  :color="plan === p.value ? 'surface-muted' : undefined"
                  class="cursor-pointer"
                  @click="plan = p.value"
                >
                  <VCardText class="d-flex align-center ga-3 py-3">
                    <VRadio :value="p.value" density="compact" hide-details />
                    <div>
                      <div class="text-label-large">{{ p.title }}</div>
                      <div class="text-body-small" style="opacity: 0.7">{{ p.desc }}</div>
                    </div>
                  </VCardText>
                </VCard>
              </div>
            </VRadioGroup>
          </VWindowItem>

          <VWindowItem :value="3">
            <VAlert
              v-if="done"
              type="success"
              title="All set!"
              text="Your workspace is ready. (demo only)"
            />
            <div v-else>
              <p class="text-body-medium">
                Everything looks good. Click <strong>Finish</strong> to create your
                workspace on the <strong>{{ plan }}</strong> plan.
              </p>
            </div>
          </VWindowItem>
        </VWindow>

        <div class="d-flex justify-space-between mt-6">
          <EBtnGhost :disabled="step === 0" @click="step--">Back</EBtnGhost>
          <EBtn @click="next">{{ isLast ? 'Finish' : 'Continue' }}</EBtn>
        </div>
      </VCardText>
    </VCard>
  </div>
</template>
