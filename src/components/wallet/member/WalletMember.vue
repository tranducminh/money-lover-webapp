<template>
  <div style="width: 60%; margin: 30px auto">
    <n-data-table :columns="columns" :data="data" :pagination="pagination" />
  </div>
</template>

<script lang="ts">
import { h, defineComponent, computed } from "vue";
import { NTag, NButton } from "naive-ui";
import { useStore } from "vuex";
import { IMember } from "@/store/entity.interface";
import { formatUserRole } from "@/utils";
import { UserRole } from "@/constants";
import { DELETE_MEMBER } from "@/store/action-types";

const createData = (members: IMember[]) => {
  return members?.map((member) => ({
    key: member.id,
    name: member.name,
    email: member.email,
    role: member.role,
  }));
};

interface RowData {
  key: string;
  name: string;
  email: string;
  role: number;
}

export default defineComponent({
  name: "WalletMember",

  setup() {
    const store = useStore();
    const members = computed(() => store.state.member?.list);
    const currentRole = computed(() => store.state.wallet.currentWallet?.role);
    const data = computed(() => createData(members.value));

    // eslint-disable-next-line @typescript-eslint/ban-types
    const createColumns = ({ removeMember }: { removeMember: Function }) => {
      return [
        {
          title: "Name",
          key: "name",
        },
        {
          title: "Email",
          key: "email",
        },
        {
          title: "Tags",
          key: "tags",
          render(data: RowData) {
            return h(
              NTag,
              {
                type: "info",
              },
              {
                default: () => formatUserRole(data.role),
              }
            );
          },
        },
        {
          title: "Action",
          key: "actions",
          render(data: RowData) {
            if (currentRole.value === UserRole.OBSERVER) return null;
            if (data.role === UserRole.OWNER) return null;
            if (
              data.role === UserRole.OBSERVER ||
              (data.role === UserRole.MANAGER &&
                currentRole.value === UserRole.OWNER)
            )
              return h(
                NButton,
                {
                  size: "small",
                  color: "red",
                  ghost: true,
                  onClick: () => removeMember(data),
                },
                { default: () => "Remove" }
              );
          },
        },
      ];
    };

    const columns = createColumns({
      removeMember(data: RowData) {
        store.dispatch(DELETE_MEMBER, data.key);
      },
    });

    return {
      data,
      columns,
      pagination: {
        pageSize: 10,
      },
    };
  },
});
</script>
