import pipelineAtivo from "@/assets/pipeline-ativo.svg";
import pipelineInativo from "@/assets/pipeline-inativo.svg";
import estatisticasAtivo from "@/assets/estatisticas-ativo.svg";
import estatisticasInativo from "@/assets/estatisticas-inativo.svg";
import { NavItem } from "@/components/layout/nav-item";
import { SidebarSectionLabel } from "@/components/layout/sidebar-section-label";

const SidebarNav = () => {
    return (
        <nav className="flex flex-col gap-2 py-4">
            <SidebarSectionLabel>Navegação</SidebarSectionLabel>
            <div className="flex flex-col gap-1 px-3">
                <NavItem
                    to="/dashboard"
                    activeIcon={pipelineAtivo}
                    inactiveIcon={pipelineInativo}
                    label="Pipeline"
                    end
                />
                <NavItem
                    to="/dashboard/estatisticas"
                    activeIcon={estatisticasAtivo}
                    inactiveIcon={estatisticasInativo}
                    label="Estatísticas"
                />
            </div>
        </nav>
    );
};

export { SidebarNav };
