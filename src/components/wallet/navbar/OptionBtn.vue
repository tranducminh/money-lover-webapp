<template lang="">
  <n-dropdown
    trigger="hover"
    @select="handleSelect"
    :options="options"
    :show-arrow="true"
  >
    <n-button> Options </n-button>
  </n-dropdown>

  <n-modal
    v-model:show="data.showFreezeModal"
    preset="dialog"
    :title="isFreezed ? 'Unfreeze wallet' : 'Freeze wallet'"
    :content="
      isFreezed
        ? 'Are you sure to unfreeze this wallet'
        : 'Are you sure to freeze this wallet'
    "
    positive-text="Confirm"
    @positive-click="handleFreezeWallet"
    negative-text="Cancel"
  />

  <n-modal
    v-model:show="data.showDeleteWalletModal"
    preset="dialog"
    title="Delete this wallet"
    content="Are you sure want to delete this wallet"
    positive-text="Confirm"
    @positive-click="handleDeleteWallet"
    negative-text="Cancel"
  />
</template>
<script>
import { defineComponent, h, computed, ref } from "vue";
import { useStore } from "vuex";
import { NIcon } from "naive-ui";
import {
  EditFilled,
  DeleteOutlineFilled,
  StopCircleOutlined,
  PlayArrowOutlined,
} from "@vicons/material";
import {
  UN_FREEZE_WALLET,
  FREEZE_WALLET,
  DELETE_WALLET,
} from "@/store/action-types";

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

export default defineComponent({
  setup() {
    const store = useStore();
    const isFreezed = computed(
      () => store.state.wallet.currentWallet.is_freezed
    );

    const data = ref({
      showFreezeModal: false,
      showDeleteWalletModal: false,
      showMoveWalletModal: false,
      showEditWalletModal: false,
    });
    const options = [
      {
        label: "Edit",
        key: "edit",
        icon: renderIcon(EditFilled),
      },
      {
        label: "Delete",
        key: "delete",
        icon: renderIcon(DeleteOutlineFilled),
      },
      {
        label: isFreezed.value ? "Unfreeze" : "Freeze",
        key: "freeze",
        icon: isFreezed.value
          ? renderIcon(PlayArrowOutlined)
          : renderIcon(StopCircleOutlined),
      },
    ];

    const handleFreezeWallet = () => {
      if (isFreezed.value) {
        store.dispatch(UN_FREEZE_WALLET);
      } else {
        store.dispatch(FREEZE_WALLET);
      }
    };

    const handleDeleteWallet = () => {
      store.dispatch(DELETE_WALLET);
    };

    const handleSelect = (key) => {
      switch (key) {
        case "freeze":
          data.value.showFreezeModal = true;
          break;

        case "delete":
          data.value.showDeleteWalletModal = true;
          break;

        case "edit":
          data.value.showEditWalletModal = true;
          break;

        case "move":
          data.value.showMoveWalletModal = true;
          break;

        default:
          break;
      }
    };

    return {
      data,
      isFreezed,
      options,
      handleSelect,
      handleFreezeWallet,
      handleDeleteWallet,
    };
  },
});
</script>
